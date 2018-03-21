'use strict'

import _ from 'lodash'
import moment from 'moment'
import {gameDb, matchDb, matchUsersDb, setDb} from '../db'
import {logger, utils} from '../core'
import {constants} from '../shared'

const gameLogic = {

  getAll: async () => {
    logger.info('business/gameLogic|getAll')

    return await gameDb.getAll()
  },

  processMatchesForInsert: (nextMatchId, gameId, homeValues, awayValues) => {
    logger.info('business/gameLogic|processMatchesForInsert', {nextMatchId, gameId, homeValues, awayValues})

    const matchTemplate = [
      constants.matchType.DOUBLE,
      constants.matchType.DOUBLE,
      constants.matchType.SINGLE,
      constants.matchType.SINGLE,
      constants.matchType.DOUBLE,
      constants.matchType.DOUBLE
    ]

    return matchTemplate.map((type, index) => {
      console.log('type', type)
      console.log('index', index)
      const winner = utils.parseMatchWinner(homeValues.scores[index], awayValues.scores[index])
      const homePlayers = utils.parsePlayers(homeValues.players[index])
      const awayPlayers = utils.parsePlayers(awayValues.players[index])
      const match = {
        id: nextMatchId++,
        position: index + 1,
        type: type,
        gameId: gameId,
        winner: winner
      }

      return {
        match,
        homePlayers,
        awayPlayers
      }
    })
  },

  processSetsForInsert: (nextSetId, matchIds, homeValues, awayValues) => {
    logger.info('business/gameLogic|processSetsForInsert', {nextSetId, matchIds, homeValues, awayValues})

    const sets = matchIds.map((x, index) => [
      {
        id: nextSetId++,
        matchId: x,
        winner: utils.parseSetWinner(homeValues.scores[index][0], awayValues.scores[index][0]),
        position: 1,
        homeScore: homeValues.scores[index][0],
        awayScore: awayValues.scores[index][0]
      },
      {
        id: nextSetId++,
        matchId: x,
        winner: utils.parseSetWinner(homeValues.scores[index][1], awayValues.scores[index][1]),
        position: 2,
        homeScore: homeValues.scores[index][1],
        awayScore: awayValues.scores[index][1]
      }
    ])

    return _.flatten(sets)
  },

  processMatchUsersForInsert: (matchData) => {
    logger.info('business/gameLogic|processMatchUsersForInsert', {matchData})

    const positions = {
      [constants.matchType.SINGLE]: [1],
      [constants.matchType.DOUBLE]: [1, 2]
    }
    const matchUsers = matchData.map(x => positions[x.match.type]
      .map((y, index) => (
        {
          matchId: x.match.id,
          position: y,
          homePlayerId: x.homePlayers[index],
          awayPlayerId: x.awayPlayers[index]
        }
      ))
    )

    return _.flatten(matchUsers)
  },

  insert: async (values, homeValues, awayValues) => {
    logger.info('business/gameLogic|insert', {values, homeValues, awayValues})

    const lastMatchId = await matchDb.getLastInsertedId()
    const lastSetId = await setDb.getLastInsertedId()
    const nextMatchId = lastMatchId + 1
    const nextSetId = lastSetId + 1

    const gameValues = {
      homeScore: 0,
      awayScore: 0,
      winner: '',
      date: moment(values.date).format('DD-MM-YYYY'),
      homeTeamId: values.homeTeamId,
      awayTeamId: values.awayTeamId
    }

    const game = await gameDb.insert(gameValues)

    const matchData = gameLogic.processMatchesForInsert(nextMatchId, game.id, homeValues, awayValues)
    const matchIds = matchData.map(x => x.match.id)
    const matchesValues = matchData.map(x => x.match)
    const matchUsersValues = gameLogic.processMatchUsersForInsert(matchData)
    const setsValues = gameLogic.processSetsForInsert(nextSetId, matchIds, homeValues, awayValues)

    console.log(JSON.stringify(matchesValues, null ,2))
    await matchDb.insertBulk(matchesValues)
    console.log(JSON.stringify(matchUsersValues, null ,2))
    await matchUsersDb.insertBulk(matchUsersValues)
    console.log(JSON.stringify(setsValues, null ,2))
    await setDb.insertBulk(setsValues)
  },

  delete: async (id) => {
    logger.info('business/gameLogic|delete', {id})

    await gameDb.delete(id)
  }
}

export default gameLogic
