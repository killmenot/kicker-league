'use strict'

import _ from 'lodash'
import {gameLogic, teamLogic} from '../business'
import {logger} from '../core'

export default {

  list: async (req, res, next) => {
    logger.info('controllers/gameController|list')

    try {
      const games = await gameLogic.getAll()

      res.render('admin/games/index', {
        title: 'Admin | Games',
        games: games
      });
    } catch (err) {
      return next(err);
    }
  },

  new: async (req, res, next) => {
    logger.info('controllers/gameController|new')

    try {
      const teams = await teamLogic.getAll()

      return res.render('admin/games/edit', {
        title: 'Admin | New game',
        game: {},
        teams: teams
      });
    } catch (err) {
      return next(err)
    }
  },

  create: async (req, res, next) => {
    logger.info('controllers/gameController|create', {body: req.body})

    try {
      const gameValues = _.pick(req.body, ['date', 'homeTeamId', 'awayTeamId'])
      const homeValues = {
        scores: req.body.homeScores,
        players: req.body.homePlayers,
      }
      const awayValues = {
        scores: req.body.awayScores,
        players: req.body.awayPlayers,
      }

      await gameLogic.insert(gameValues, homeValues, awayValues)

      return res.redirect('/admin/games');
    } catch (err) {
      next(err);
    }
  },

  destroy: async (req, res, next) => {
    logger.info('controllers/gameController|destroy', {id: req.params.id})

    try {
      const gameId = parseInt(req.params.id, 10)

      await gameLogic.delete(gameId)

      return res.redirect('/admin/games');
    } catch (err) {
      return next(err)
    }
  }
}
