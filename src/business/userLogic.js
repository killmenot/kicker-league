'use strict'

import {logger} from '../core'
import {userDb} from '../db'
import {User} from '../models'

export default {

  getAll: async () => {
    logger.info('business/userDb|getAll')

    const dbUsers = await userDb.getAll()

    return (dbUsers || []).map(x => new User(x))
  },

  getByIds: async (ids) => {
    logger.info('business/userDb|getByIds', {ids})

    const dbUsers = await userDb.getByIds(ids)

    return (dbUsers || []).map(x => new User(x))
  },

  getByTeamId: async (teamId) => {
    logger.info('business/userLogic|getByTeamId', {teamId})

    const dbUsers = await userDb.getByTeamId(teamId)

    return (dbUsers || []).map(x => new User(x))
  },

  insert: async (teamId, values) => {
    logger.info('business/userLogic|insert', {teamId, values})

    const user = {
      firstName: values.firstName,
      lastName: values.lastName,
      teamId: teamId
    }

    return await userDb.insert(user)
  },

  delete: async (teamId, id) => {
    logger.info('business/userLogic|delete', {teamId, id})

    return await userDb.delete(id)
  }
}
