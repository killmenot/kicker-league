'use strict'

import _ from 'lodash'
import moment from 'moment'
import {transaction, gameDb, matchDb, matchUsersDb, setDb, teamDb, userDb} from '../db'
import {logger, utils} from '../core'
import {Game, Match, MatchSet, MatchUsers, Team, User} from '../models'
import {constants} from '../shared'

const matchTemplate = [
  constants.matchType.DOUBLE,
  constants.matchType.DOUBLE,
  constants.matchType.SINGLE,
  constants.matchType.SINGLE,
  constants.matchType.DOUBLE,
  constants.matchType.DOUBLE
]

const gameLogic = {

  new: () => {
    logger.info('business/gameLogic|new')

    const game = new Game()
    game.matches = matchTemplate.map((type, index) => ({
      position: index + 1,
      type: type
    }))

    game.matches.forEach(x => {
      x.sets = [
        {
          position: 1
        },
        {
          position: 2
        }
      ]

      x.homePlayers = []
      x.awayPlayers = []
    })

    return game
  },

  processGamesForResponse: async (dbGames) => {
    logger.info('business/gameLogic|processGamesForResponse', {ids: dbGames.map(x => x.id)})

    const gameIds = dbGames.map(x => x.id)

    const dbMatches = await matchDb.getByGameIds(gameIds)
    const matchIds = dbMatches.map(x => x.id)

    const dbMatchUsers = await matchUsersDb.getByMatchIds(matchIds)
    const matchUsers = dbMatchUsers.map(x => new MatchUsers(x))
    const homePlayerIdsGrouped = _.chain(matchUsers)
      .groupBy('matchId')
      .mapValues(g => _.sortBy(g, x => x.position).map(x => x.homePlayerId))
      .value()
    const awayPlayerIdsGrouped = _.chain(matchUsers)
      .groupBy('matchId')
      .mapValues(g => _.sortBy(g, x => x.position).map(x => x.awayPlayerId))
      .value()
    const userIds = _.chain(matchUsers)
      .flatMap(x => [x.homePlayerId, x.awayPlayerId])
      .uniq()
      .value()

    const dbUsers = await userDb.getByIds(userIds)
    const users = dbUsers.map(x => new User(x))
    const usersIndexed = _.keyBy(users, 'id')

    const dbSets = await setDb.getByMatchIds(matchIds)
    const sets = dbSets.map(x => new MatchSet(x))
    const setsGrouped = _.groupBy(sets, 'matchId')

    const matches = dbMatches.map(x => {
      const match = new Match(x)

      match.addSets(setsGrouped[x.id])

      const homePlayers = (homePlayerIdsGrouped[x.id] || []).map(y => usersIndexed[y])
      match.addHomePlayers(homePlayers)

      const awayPlayers = (awayPlayerIdsGrouped[x.id] || []).map(y => usersIndexed[y])
      match.addAwayPlayers(awayPlayers)

      return match
    })

    const teamIds = _.chain(dbGames)
      .flatMap(x => [x.homeTeamId, x.awayTeamId])
      .flatten()
      .value()
    const dbTeams = await teamDb.getByIds(teamIds)
    const teams = dbTeams.map(x => new Team(x))
    const teamsIndexed = _.keyBy(teams, 'id')
    const matchesGrouped = _.groupBy(matches, 'gameId')

    return dbGames.map(x => {
      const game = new Game(x)

      game.setHomeTeam(teamsIndexed[x.homeTeamId])
      game.setAwayTeam(teamsIndexed[x.awayTeamId])
      game.addMatches(matchesGrouped[x.id])

      return game
    })
  },

  getAll: async () => {
    logger.info('business/gameLogic|getAll')

    const dbGames = await gameDb.getAll()

    return gameLogic.processGamesForResponse(dbGames)
  },

  getById: async (id) => {
    logger.info('business/gameLogic|getById', {id})

    const dbGame = await gameDb.getById(id)
    const games = await gameLogic.processGamesForResponse([dbGame])

    return games[0]
  },

  processMatchesForInsert: (nextMatchId, gameId, homeValues, awayValues) => {
    logger.info('business/gameLogic|processMatchesForInsert', {nextMatchId, gameId, homeValues, awayValues})

    return matchTemplate.map((type, index) => {
      const winner = utils.parseMatchWinner(homeValues.scores[index], awayValues.scores[index])
      const homePlayers = utils.parsePlayers(homeValues.players[index])
      const awayPlayers = utils.parsePlayers(awayValues.players[index])
      const match = {
        id: nextMatchId++,
        position: index + 1,
        type,
        gameId,
        winner
      }

      return {
        match,
        homePlayers,
        awayPlayers
      }
    })
  },

  processSetsForInsert: (nextSetId, gameId, matchIds, homeValues, awayValues) => {
    logger.info('business/gameLogic|processSetsForInsert', {nextSetId, gameId, matchIds, homeValues, awayValues})

    const sets = matchIds.map((x, index) => [
      {
        id: nextSetId++,
        gameId,
        matchId: x,
        winner: utils.parseSetWinner(homeValues.scores[index][0], awayValues.scores[index][0]),
        position: 1,
        homeScore: homeValues.scores[index][0],
        awayScore: awayValues.scores[index][0]
      },
      {
        id: nextSetId++,
        gameId,
        matchId: x,
        winner: utils.parseSetWinner(homeValues.scores[index][1], awayValues.scores[index][1]),
        position: 2,
        homeScore: homeValues.scores[index][1],
        awayScore: awayValues.scores[index][1]
      }
    ])

    return _.flatten(sets)
  },

  processMatchUsersForInsert: (gameId, matchData) => {
    logger.info('business/gameLogic|processMatchUsersForInsert', {gameId, matchData})

    const positions = {
      [constants.matchType.SINGLE]: [1],
      [constants.matchType.DOUBLE]: [1, 2]
    }
    const matchUsers = matchData.map(x => positions[x.match.type]
      .map((y, index) => (
        {
          gameId,
          matchId: x.match.id,
          position: y,
          homePlayerId: x.homePlayers[index],
          awayPlayerId: x.awayPlayers[index]
        }
      ))
    )

    return _.flatten(matchUsers)
  },

  processGameForInsert: (id, values, matchData) => {
    logger.info('business/gameLogic|processGameForInsert', {id, values, matchData})

    const homeScore = matchData.filter(x => x.match.winner === constants.winner.HOME).length
    const awayScore = matchData.filter(x => x.match.winner === constants.winner.AWAY).length
    const winner = utils.parseGameWinner(homeScore, awayScore)

    return {
      id,
      homeScore,
      awayScore,
      winner,
      date: moment(values.date, 'MM/DD/YYYY').format('DD-MM-YYYY'),
      homeTeamId: values.homeTeamId,
      awayTeamId: values.awayTeamId
    }
  },

  processGameForUpdate: (values, matchData) => {
    logger.info('business/gameLogic|processGameForUpdate', {values, matchData})

    const homeScore = matchData.filter(x => x.match.winner === constants.winner.HOME).length
    const awayScore = matchData.filter(x => x.match.winner === constants.winner.AWAY).length
    const winner = utils.parseGameWinner(homeScore, awayScore)

    return {
      homeScore,
      awayScore,
      winner,
      date: moment(values.date, 'MM/DD/YYYY').format('DD-MM-YYYY'),
      homeTeamId: values.homeTeamId,
      awayTeamId: values.awayTeamId
    }
  },

  insert: async (values, homeValues, awayValues) => {
    logger.info('business/gameLogic|insert', {values, homeValues, awayValues})

    const lastGameId = await gameDb.getLastInsertedId()
    const lastMatchId = await matchDb.getLastInsertedId()
    const lastSetId = await setDb.getLastInsertedId()
    const nextGameId = lastGameId + 1
    const nextMatchId = lastMatchId + 1
    const nextSetId = lastSetId + 1

    const matchData = gameLogic.processMatchesForInsert(nextMatchId, nextGameId, homeValues, awayValues)
    const gameValues = gameLogic.processGameForInsert(nextGameId, values, matchData)
    const matchIds = matchData.map(x => x.match.id)
    const matchesValues = matchData.map(x => x.match)
    const matchUsersValues = gameLogic.processMatchUsersForInsert(nextGameId, matchData)
    const setsValues = gameLogic.processSetsForInsert(nextSetId, nextGameId, matchIds, homeValues, awayValues)

    await transaction(async (t) => {
      const options = {transaction: t}

      await gameDb.insert(gameValues, options)
      await matchDb.insertBulk(matchesValues, options)
      await matchUsersDb.insertBulk(matchUsersValues, options)
      await setDb.insertBulk(setsValues, options)
    })
  },

  update: async (id, values, homeValues, awayValues) => {
    logger.info('business/gameLogic|update', {id, values, homeValues, awayValues})

    const dbGame = await gameDb.getById(id)
    const dbMatches = await matchDb.getByGameIds([dbGame.id])
    const dbSets = await setDb.getByGameIds([dbGame.id])
    const dbMatchUsers = await matchUsersDb.getByGameIds([dbGame.id])

    const dbMatchIds = dbMatches.map(x => x.id)
    const dbSetIds = dbSets.map(x => x.id)
    const dbMatchUsersIds = dbMatchUsers.map(x => x.id)

    const lastMatchId = await matchDb.getLastInsertedId()
    const lastSetId = await setDb.getLastInsertedId()
    const nextMatchId = lastMatchId + 1
    const nextSetId = lastSetId + 1

    const matchData = gameLogic.processMatchesForInsert(nextMatchId, id, homeValues, awayValues)
    const gameValues = gameLogic.processGameForUpdate(values, matchData)
    const matchIds = matchData.map(x => x.match.id)
    const matchesValues = matchData.map(x => x.match)
    const matchUsersValues = gameLogic.processMatchUsersForInsert(id, matchData)
    const setsValues = gameLogic.processSetsForInsert(nextSetId, id, matchIds, homeValues, awayValues)

    await transaction(async (t) => {
      const options = {transaction: t}

      await matchUsersDb.deleteBulk(dbMatchUsersIds, options)
      await setDb.deleteBulk(dbSetIds, options)
      await matchDb.deleteBulk(dbMatchIds, options)

      await gameDb.update(id, gameValues, options)

      await matchDb.insertBulk(matchesValues, options)
      await matchUsersDb.insertBulk(matchUsersValues, options)
      await setDb.insertBulk(setsValues, options)
    })
  },

  delete: async (id) => {
    logger.info('business/gameLogic|delete', {id})

    await gameDb.delete(id)
  }
}

export default gameLogic
