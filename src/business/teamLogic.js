'use strict'

import {logger} from '../core'
import {teamDb} from '../db'
import {Team} from '../models'

export default {

  getAll: async () => {
    logger.info('business/teamLogic|getAll')

    const dbTeams = await teamDb.getAll()

    return (dbTeams || []).map(x => new Team(x))
  },

  getById: async (id) => {
    logger.info('business/teamLogic|getById')

    const dbTeam = await teamDb.getById(id)

    return dbTeam ?
      new Team(dbTeam) :
      null
  },

  insert: async (values) => {
    logger.info('business/teamLogic|insert', {values})

    const team = {
      name: values.name,
      location: values.location
    }

    return await teamDb.insert(team)
  },

  delete: async (id) => {
    logger.info('business/teamLogic|delete', {id})

    return await teamDb.delete(id)
  }
}
