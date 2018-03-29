'use strict'

import {logger} from '../core'

export default {

  /**
   * Gets default admin page
   *
   * @param {Request} req
   * @param {Response} res
   * @param {Function} [next]
   * @returns {*}
   */
  index: async (req, res, next) => {
    logger.info('controllers/adminController|index')

    try {
      return res.redirect('admin/teams')
    } catch (err) {
      return next(err)
    }
  }
}
