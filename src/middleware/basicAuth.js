'use strict'

import basicAuth from 'express-basic-auth'
import config from '../../config'

export default basicAuth({
  challenge: true,
  authorizer: (username, password) => {
    return username === config.auth.username && password === config.auth.password
  }
})
