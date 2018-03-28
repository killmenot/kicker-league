'use strict'

import {dashboardLogic} from '../business'
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
      const {grid, teams, list} = await dashboardLogic.getStats()

      res.render('index', {
        title: 'Taganrog Kicker League, Season 2018',
        teams: teams,
        grid: grid,
        list: list
      });
    } catch (err) {
      return next(err)
    }
  }
}
