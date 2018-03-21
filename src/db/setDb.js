'use strict'

import {logger} from '../core'
import models from '../models'

export default {

  insertBulk: async (records) => {
    logger.info('db/setDb|insertBulk', {records})

    return await models.Set.bulkCreate(records)
  },

  getLastInsertedId: async () => {
    logger.info('db/setDb|getLastInsertedId')

    const dbData = await models.Set.max('id')

    return isNaN(dbData) ?
      0 :
      dbData
  }
}
