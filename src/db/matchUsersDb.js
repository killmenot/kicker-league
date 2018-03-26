'use strict'

import dbBase from './dbBase'
import {logger} from '../core'
import models from './models'

export default Object.assign({

  getByMatchIds: async (matchIds) => {
    logger.info('db/matchUsersDb|getByMatchIds', {matchIds})

    const options = {
      where: {
        matchId: matchIds
      }
    }

    return await models.MatchUsers.findAll(options)
  },

  getByGameIds: async (gameIds) => {
    logger.info('db/matchUsersDb|getByGameIds', {gameIds})

    const options = {
      where: {
        gameId: gameIds
      }
    }

    return await models.MatchUsers.findAll(options)
  }

}, dbBase(models.MatchUsers))
