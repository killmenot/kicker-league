'use strict'

import dbBase from './dbBase'
import {logger} from '../core'
import models from './models'

export default Object.assign({

  getByTeamId: async (teamId) => {
    logger.info('db/userDb|getByTeamId', {teamId})

    const options = {
      where: {
        teamId: teamId
      }
    }

    return await models.User.findAll(options)
  }

}, dbBase(models.User))
