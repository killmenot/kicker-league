'use strict'

import {teamLogic, userLogic} from '../business'
import {logger} from '../core'

export default {

  list: async (req, res, next) => {
    logger.info('controllers/teamController|list')

    try {
      const teams = await teamLogic.getAll()

      return res.render('admin/teams/index', {
        title: 'Admin | Teams',
        teams: teams
      });
    } catch (err) {
      return next(err)
    }
  },

  create: async (req, res, next) => {
    logger.info('controllers/teamController|create', {team: req.body})

    try {
      await teamLogic.insert(req.body)

      return res.redirect('/admin/teams');
    } catch (err) {
      return next(err)
    }
  },

  edit: async (req, res, next) => {
    logger.info('controllers/teamController|edit', {id: req.params.id})

    try {
      const teamId = parseInt(req.params.id, 10)
      const team = await teamLogic.getById(teamId)
      const users = await userLogic.getByTeamId(team.id)

      return res.render('admin/teams/edit', {
        title: `Admin | Teams | ${team.name}`,
        team: team,
        users: users
      });
    } catch (err) {
      return next(err)
    }
  },

  destroy: async (req, res, next) => {
    logger.info('controllers/teamController|destroy', {id: req.params.teamId})

    try {
      const teamId = parseInt(req.params.id, 10)
      await teamLogic.delete(teamId)

      return res.redirect('/admin/teams');
    } catch (err) {
      return next(err)
    }
  }
}
