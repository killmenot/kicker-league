'use strict'

import dbBase from './dbBase'
import {logger} from '../core'
import models from './models'

export default Object.assign({

  getByMatchIds: async (matchIds) => {
    logger.info('db/setDb|getByMatchIds', {matchIds})

    const options = {
      where: {
        matchId: matchIds
      }
    }

    return await models.Set.findAll(options)
  },

  getByGameIds: async (gameIds) => {
    logger.info('db/setDb|getByGameIds', {gameIds})

    const options = {
      where: {
        gameId: gameIds
      }
    }

    return await models.Set.findAll(options)
  }

}, dbBase(models.Set))
