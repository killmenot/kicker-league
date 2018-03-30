'use strict'

import dbBase from './dbBase'
import {logger} from '../core'
import models from './models'

export default Object.assign({

  getByHomeAndAwayTeamIds: async (homeTeamId, awayTeamId) => {
    logger.info('db/gameDb|getByHomeAndAwayTeamIds', {homeTeamId, awayTeamId})

    const options = {
      where: {
        homeTeamId: homeTeamId,
        awayTeamId: awayTeamId,
      }
    }

    return await models.Game.findOne(options)
  }
}, dbBase(models.Game))
