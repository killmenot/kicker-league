'use strict'

import {logger} from '../core'
import models from '../models'

export default {

  insertBulk: async (records) => {
    logger.info('db/matchUsersDb|insertBulk', {records})

    return await models.MatchUsers.bulkCreate(records)
  }
}
