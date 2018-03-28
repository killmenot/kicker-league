'use strict'

import dbBase from './dbBase'
import {logger} from '../core'
import models from './models'

export default Object.assign({
  getByGameIds: async (gameIds) => {
    logger.info('db/penaltyDb|getByGameIds', {gameIds})

    const options = {
      where: {
        gameId: gameIds
      }
    }

    return await models.Penalty.findAll(options)
  }
}, dbBase(models.Penalty))
