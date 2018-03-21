'use strict'

import {logger} from '../core'

const dbBase = {
  transaction: async () => {
    logger.info('db/dbBase|transaction')
  }
}

export default dbBase
