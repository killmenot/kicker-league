'use strict'

import {userLogic} from '../../business'
import {logger} from '../../core'

export default {

  /**
   * Gets users by team id
   *
   * @param {Request} req
   * @param {Response} res
   * @param {Function} [next]
   * @returns {*}
   */
  getUsersByTeamId: async (req, res, next) => {
    logger.info('api/teamController|getUsersByTeamId')

    try {
      const teamId = parseInt(req.params.id, 10)
      const users = await userLogic.getByTeamId(teamId)

      return res.json(users)
    } catch (err) {
      return next(err)
    }
  }
}
