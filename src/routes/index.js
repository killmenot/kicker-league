'use strict'

import api from '../api/v1'
import {logger} from '../core'
import {basicAuth} from '../middleware'
import {homeController} from '../controllers'
import adminRoutes from './adminRoutes'

export default (app) => {
  logger.info('routes')

  app.get('/', homeController.index)
  app.use('/api/v1', api)
  app.use('/admin', basicAuth, adminRoutes)
}
