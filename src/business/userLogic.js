'use strict'

import {logger} from '../core'
import models from '../models'

export default {

  getByTeamId: async (teamId) => {
    logger.info('business/userLogic|getByTeamId')

    const options = {
      where: {
        teamId: teamId
      }
    }

    return await models.User.findAll(options)
  },

  insert: async (teamId, props) => {
    logger.info('business/userLogic|insert', {teamId, props})

    return await models.User.create({
      firstName: props.firstName,
      lastName: props.lastName,
      teamId: teamId
    })
  },

  delete: async (teamId, id) => {
    logger.info('business/userLogic|delete', {teamId, id})

    const options = {
      where: {
        id: id,
        teamId: teamId
      }
    }

    return await models.User.destroy(options)
  }
}
