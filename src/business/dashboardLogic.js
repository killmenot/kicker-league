'use strict'

import _ from 'lodash'
import {logger} from '../core'
import {teamDb, gameDb} from '../db'
import {Team, Game, Stats} from '../models'

export default {

  getStats: async () => {
    logger.info('business/dashboardLogic|getStats')

    const dbTeams = await teamDb.getAll()
    const teams = dbTeams.map(x => new Team(x))
    const teamsIndexed = _.keyBy(teams, 'id')

    const dbGames = await gameDb.getAll()
    const games = dbGames.map(x => new Game(x))
    const gamesIndexed = _.keyBy(games, 'key')
    const gamesGroupedByHomeTeamId = _.groupBy(games, 'homeTeamId')
    const gamesGroupedByAwayTeamId = _.groupBy(games, 'awayTeamId')

    const grid = _.chain(teams)
      .map(x => teams.map(y => ({
        homeTeam: teamsIndexed[x.id],
        game: gamesIndexed[Game.buildKey(x.id, y.id)] || {}
      })))
      .value()
    const list = _.chain(teams)
      .map(x => ({
        team: x,
        games: (gamesGroupedByHomeTeamId[x.id] || []).concat(gamesGroupedByAwayTeamId[x.id] || [])
      }))
      .map(x => new Stats(x.team, x.games))
      .orderBy(['points', 'odds'], ['desc', 'desc'])
      .value()

    return {
      grid,
      teams,
      list
    }
  },
}
