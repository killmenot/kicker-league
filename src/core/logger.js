'use strict'

import winston from 'winston'

const logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      timestamp: true,
      colorize: true,
      level: 'debug'
    })
  ]
})

export default logger
