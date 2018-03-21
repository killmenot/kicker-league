'use strict'

import {userLogic} from '../business'
import {logger} from '../core'

export default {

  create: async (req, res, next) => {
    logger.info('controllers/userController|create', {id: req.params.id, user: req.body})

    try {
      const teamId = parseInt(req.params.id, 10)

      await userLogic.insert(teamId, req.body)

      return res.redirect(`/admin/teams/${teamId}/edit`)
    } catch (err) {
      return next(err)
    }
  },

  destroy: async (req, res, next) => {
    logger.info('controllers/userController|destroy', {id: req.params.id, userId: req.params.userId})

    try {
      const teamId = parseInt(req.params.id, 10)
      const userId = parseInt(req.params.userId, 10)

      await userLogic.delete(teamId, userId)

      return res.redirect(`/admin/teams/${teamId}/edit`);
    } catch (err) {
      return next(err)
    }
  }
}
