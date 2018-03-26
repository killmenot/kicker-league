'use strict'

import path from 'path'
import express from 'express'
//import favicon from 'serve-favicon'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import {logger} from './core'
import routes from './routes'

export default () => {
  logger.info('app')

  const app = express()

  // view engine setup
  app.set('views', path.join(__dirname, '../views'))
  app.set('view engine', 'pug')

  // uncomment after placing your favicon in /public
  //app.use(favicon(__dirname + '/public/favicon.ico'));
  app.use(morgan('dev'))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(cookieParser())
  app.use(express.static(path.join(__dirname, '../public')))

  routes(app)

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
  })

  // error handler
  // no stacktraces leaked to user unless in development environment
  app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: (app.get('env') === 'development') ? err : {}
    })
  })

  return app
}
