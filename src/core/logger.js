'use strict'

import { createLogger, transports } from 'winston'

const logger = createLogger({
  transports: [
    new transports.Console({
      timestamp: true,
      colorize: true,
      level: 'debug'
    })
  ]
})

export default logger
