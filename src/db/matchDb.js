'use strict'

import {logger} from '../core'
import models from '../models'

export default {

  insertBulk: async (records) => {
    logger.info('db/matchDb|insertBulk', {records})

    return await models.Match.bulkCreate(records)
  },

  getLastInsertedId: async () => {
    logger.info('db/matchDb|getLastInsertedId')

    const dbData = await models.Match.max('id')

    return isNaN(dbData) ?
      0 :
      dbData
  }
}
