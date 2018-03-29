'use strict'

import _ from 'lodash'
import moment from 'moment'
import {transaction, gameDb, matchDb, matchUsersDb, penaltyDb, setDb, teamDb, userDb} from '../db'
import {logger, utils} from '../core'
import {Game, Match, MatchSet, MatchUsers, Penalty, Team, User} from '../models'
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

    game.penalties = utils.buildPenalties()

    return game
  },

  processGamesForResponse: async (dbGames) => {
    logger.info('business/gameLogic|processGamesForResponse', {ids: dbGames.map(x => x.id)})

    const gameIds = dbGames.map(x => x.id)

    const dbMatches = await matchDb.getByGameIds(gameIds)
    const matchIds = dbMatches.map(x => x.id)

    const dbMatchUsers = await matchUsersDb.getByMatchIds(matchIds)
    const dbPenalties = await penaltyDb.getByGameIds(gameIds)
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
      .concat(_.flatMap(dbPenalties, x => [x.homePlayerId, x.awayPlayerId]))
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

    const penalties = dbPenalties.map(x => new Penalty(x))
    const penaltiesGrouped = _.groupBy(penalties, 'gameId')

    return dbGames.map(x => {
      const game = new Game(x)

      game.setHomeTeam(teamsIndexed[x.homeTeamId])
      game.setAwayTeam(teamsIndexed[x.awayTeamId])
      game.addMatches(matchesGrouped[x.id])

      const penalties = _.unionBy(penaltiesGrouped[x.id] || [],  utils.buildPenalties(), 'position')
      game.addPenalties(penalties)

      return game
    })
  },

  getAll: async () => {
    logger.info('business/gameLogic|getAll')

    const dbGames = await gameDb.getAll()
    const games = await gameLogic.processGamesForResponse(dbGames)

    return _.orderBy(games, x => [x.date], ['asc'])
  },

  getById: async (id) => {
    logger.info('business/gameLogic|getById', {id})

    const dbGame = await gameDb.getById(id)
    const games = await gameLogic.processGamesForResponse([dbGame])

    return games[0]
  },

  processMatchesForInsert: (nextId, gameId, homeValues, awayValues) => {
    logger.info('business/gameLogic|processMatchesForInsert', {nextId, gameId, homeValues, awayValues})

    return matchTemplate.map((type, index) => {
      const winner = utils.parseMatchWinner(homeValues.scores[index], awayValues.scores[index])
      const homePlayers = utils.parsePlayers(homeValues.players[index])
      const awayPlayers = utils.parsePlayers(awayValues.players[index])
      const match = {
        id: nextId++,
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

  processSetsForInsert: (nextId, gameId, matchIds, homeValues, awayValues) => {
    logger.info('business/gameLogic|processSetsForInsert', {nextId, gameId, matchIds, homeValues, awayValues})

    const sets = matchIds.map((x, index) => [
      {
        id: nextId++,
        gameId,
        matchId: x,
        winner: utils.parseSetWinner(homeValues.scores[index][0], awayValues.scores[index][0]),
        walkover: utils.parseWalkover(homeValues.scores[index][0], awayValues.scores[index][0]),
        position: 1,
        homeScore: utils.parseScore(homeValues.scores[index][0]),
        awayScore: utils.parseScore(awayValues.scores[index][0]),

      },
      {
        id: nextId++,
        gameId,
        matchId: x,
        winner: utils.parseSetWinner(homeValues.scores[index][1], awayValues.scores[index][1]),
        walkover: utils.parseWalkover(homeValues.scores[index][0], awayValues.scores[index][0]),
        position: 2,
        homeScore: utils.parseScore(homeValues.scores[index][1]),
        awayScore: utils.parseScore(awayValues.scores[index][1])
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

  processGameForInsert: (nextId, values, matchData, penaltiesValues) => {
    logger.info('business/gameLogic|processGameForInsert', {nextId, values, matchData, penaltiesValues})

    const homeScore = matchData.filter(x => x.match.winner === constants.winner.HOME).length
    const awayScore = matchData.filter(x => x.match.winner === constants.winner.AWAY).length
    const winner = utils.parseGameWinner(homeScore, awayScore, penaltiesValues)

    return {
      id: nextId,
      homeScore,
      awayScore,
      winner,
      date: moment(values.date, 'MM/DD/YYYY').format('YYYY-MM-DD'),
      homeTeamId: values.homeTeamId,
      awayTeamId: values.awayTeamId
    }
  },

  processPenaltiesForInsert: (nextId, gameId, homePenaltyValues, awayPenaltyValues) => {
    logger.info('business/gameLogic|processPenaltiesForInsert', {nextId, gameId, homePenaltyValues, awayPenaltyValues})

    const numbers = _.range(homePenaltyValues.players.length).map(x => x + 1)
    const penalties = numbers.map((x, index) => ({
      position: x,
      gameId,
      homePlayerId: parseInt(homePenaltyValues.players[index], 10) || null,
      homeScore: parseInt(homePenaltyValues.scores[index], 10) || 0,
      awayPlayerId: parseInt(awayPenaltyValues.players[index], 10) || null,
      awayScore: parseInt(awayPenaltyValues.scores[index], 10) || 0
    }))

    return penalties.filter(x => x.homePlayerId && x.awayPlayerId)
  },

  processGameForUpdate: (values, matchData, penaltiesValues) => {
    logger.info('business/gameLogic|processGameForUpdate', {values, matchData, penaltiesValues})

    const homeScore = matchData.filter(x => x.match.winner === constants.winner.HOME).length
    const awayScore = matchData.filter(x => x.match.winner === constants.winner.AWAY).length
    const winner = utils.parseGameWinner(homeScore, awayScore, penaltiesValues)

    return {
      homeScore,
      awayScore,
      winner,
      date: moment(values.date, 'MM/DD/YYYY').format('YYYY-MM-DD'),
      homeTeamId: values.homeTeamId,
      awayTeamId: values.awayTeamId
    }
  },

  insert: async (values, homeValues, awayValues, homePenalties, awayPenalties) => {
    logger.info('business/gameLogic|insert', {values, homeValues, awayValues, homePenalties, awayPenalties})

    const lastGameId = await gameDb.getLastInsertedId()
    const lastMatchId = await matchDb.getLastInsertedId()
    const lastSetId = await setDb.getLastInsertedId()
    const lastPenaltyId = await penaltyDb.getLastInsertedId()
    const nextGameId = lastGameId + 1
    const nextMatchId = lastMatchId + 1
    const nextSetId = lastSetId + 1
    const nextPenaltyId = lastPenaltyId + 1

    const matchData = gameLogic.processMatchesForInsert(nextMatchId, nextGameId, homeValues, awayValues)
    const matchIds = matchData.map(x => x.match.id)
    const matchesValues = matchData.map(x => x.match)
    const matchUsersValues = gameLogic.processMatchUsersForInsert(nextGameId, matchData)
    const setsValues = gameLogic.processSetsForInsert(nextSetId, nextGameId, matchIds, homeValues, awayValues)
    const penaltiesValues = gameLogic.processPenaltiesForInsert(nextPenaltyId, nextGameId, homePenalties, awayPenalties)
    const gameValues = gameLogic.processGameForInsert(nextGameId, values, matchData, penaltiesValues)

    await transaction(async (t) => {
      const options = {transaction: t}

      await gameDb.insert(gameValues, options)
      await matchDb.insertBulk(matchesValues, options)
      await matchUsersDb.insertBulk(matchUsersValues, options)
      await setDb.insertBulk(setsValues, options)
      if (penaltiesValues.length > 0) await penaltyDb.insertBulk(penaltiesValues, options)
    })
  },

  update: async (id, values, homeValues, awayValues, homePenalties, awayPenalties) => {
    logger.info('business/gameLogic|update', {id, values, homeValues, awayValues, homePenalties, awayPenalties})

    const dbGame = await gameDb.getById(id)
    const dbMatches = await matchDb.getByGameIds([dbGame.id])
    const dbSets = await setDb.getByGameIds([dbGame.id])
    const dbMatchUsers = await matchUsersDb.getByGameIds([dbGame.id])
    const dbPenalties = await penaltyDb.getByGameIds([dbGame.id])

    const dbMatchIds = dbMatches.map(x => x.id)
    const dbSetIds = dbSets.map(x => x.id)
    const dbMatchUsersIds = dbMatchUsers.map(x => x.id)
    const dbPenaltiesIds = dbPenalties.map(x => x.id)

    const lastMatchId = await matchDb.getLastInsertedId()
    const lastSetId = await setDb.getLastInsertedId()
    const lastPenaltyId = await penaltyDb.getLastInsertedId()
    const nextMatchId = lastMatchId + 1
    const nextSetId = lastSetId + 1
    const nextPenaltyId = lastPenaltyId + 1

    const matchData = gameLogic.processMatchesForInsert(nextMatchId, id, homeValues, awayValues)
    const matchIds = matchData.map(x => x.match.id)
    const matchesValues = matchData.map(x => x.match)
    const matchUsersValues = gameLogic.processMatchUsersForInsert(id, matchData)
    const setsValues = gameLogic.processSetsForInsert(nextSetId, id, matchIds, homeValues, awayValues)
    const penaltiesValues = gameLogic.processPenaltiesForInsert(nextPenaltyId, id, homePenalties, awayPenalties)
    const gameValues = gameLogic.processGameForUpdate(values, matchData, penaltiesValues)

    await transaction(async (t) => {
      const options = {transaction: t}

      if (dbPenaltiesIds.length > 0) await penaltyDb.deleteBulk(dbPenaltiesIds, options)
      await matchUsersDb.deleteBulk(dbMatchUsersIds, options)
      await setDb.deleteBulk(dbSetIds, options)
      await matchDb.deleteBulk(dbMatchIds, options)

      await gameDb.update(id, gameValues, options)

      await matchDb.insertBulk(matchesValues, options)
      await matchUsersDb.insertBulk(matchUsersValues, options)
      await setDb.insertBulk(setsValues, options)
      if (penaltiesValues.length > 0) await penaltyDb.insertBulk(penaltiesValues, options)
    })
  },

  delete: async (id) => {
    logger.info('business/gameLogic|delete', {id})

    await gameDb.delete(id)
  }
}

export default gameLogic
