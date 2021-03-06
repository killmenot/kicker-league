'use strict'

import dbBase from './dbBase'
import {logger} from '../core'
import models from './models'

export default Object.assign({

  getByGameIds: async (gameIds) => {
    logger.info('db/matchDb|getByGameIds', {gameIds})

    const options = {
      where: {
        gameId: gameIds
      }
    }

    return await models.Match.findAll(options)
  }

}, dbBase(models.Match))
