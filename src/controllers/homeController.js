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
      const {grid, teams, list} = await dashboardLogic.getGameStats()

      res.render('index', {
        title: 'Taganrog Kicker League, Season 2018 | Teams',
        teams: teams,
        grid: grid,
        list: list
      });
    } catch (err) {
      return next(err)
    }
  },

  /**
   * Gets players list
   *
   * @param {Request} req
   * @param {Response} res
   * @param {Function} [next]
   * @returns {*}
   */
  playersList: async (req, res, next) => {
    logger.info('controllers/homeController|playersList')

    try {
      const [active, inactive] = await dashboardLogic.getPlayersStats()

      res.render('players', {
        title: 'Taganrog Kicker League, Season 2018 | Players',
        stats: active.concat(inactive)
      });
    } catch (err) {
      return next(err)
    }
  }
}
