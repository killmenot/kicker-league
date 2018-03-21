'use strict'

import {logger} from '../core'
import models from '../models'

export default {

  getAll: async () => {
    logger.info('db/gameDb|getAll')

    return await models.Game.findAll()
  },

  insert: async (values) => {
    logger.info('db/gameDb|insert', {values})

    return await models.Game.create(values)
  },

  delete: async (id) => {
    logger.info('db/documentDb|delete', {id})

    const options = {
      where: {
        id: id
      }
    }

    return await models.Game.destroy(options)
  }
}
