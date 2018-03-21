'use strict'

import {logger} from '../core'
import models from '../models'

export default {

  getAll: async () => {
    logger.info('business/teamLogic|getAll')

    return await models.Team.findAll();
  },

  getById: async (id) => {
    logger.info('business/teamLogic|getById')

    return await models.Team.findById(id);
  },

  insert: async (props) => {
    logger.info('business/teamLogic|insert', {props})

    const team = await models.Team.create({
      name: props.name,
      location: props.location
    });

    return team.id
  },

  delete: async (id) => {
    logger.info('business/teamLogic|delete', {id})

    await models.Team.destroy({
      where: {
        id: id
      }
    })
  }
}
