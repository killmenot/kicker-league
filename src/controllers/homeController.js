'use strict'

import {logger} from '../core'

export default {

  /**
   * Gets default page
   *
   * @param {Request} req
   * @param {Response} res
   * @param {Function} [next]
   * @returns {*}
   */
  index: async (req, res, next) => {
    logger.info('controllers/homeController|index')

    try {
      res.render('index', {
        title: 'Kicker League',
        teams: []
      });
    } catch (err) {
      return next(err)
    }
  }
}
