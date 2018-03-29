'use strict'

import _ from 'lodash'
import {logger} from '../core'
import {teamDb, gameDb, userDb, statsDb} from '../db'
import {Team, Game, GameStats, User, PlayerStats, MatchStats} from '../models'

export default {

  getGameStats: async () => {
    logger.info('business/dashboardLogic|getGameStats')

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
      .map(x => new GameStats(x.team, x.games))
      .orderBy(['points', 'odds'], ['desc', 'desc'])
      .value()

    return {
      grid,
      teams,
      list
    }
  },

  getPlayersStats: async () => {
    logger.info('business/dashboardLogic|getPlayersStats')

    // games
    const dbGames = await gameDb.getAll()
    const games = dbGames.map(x => new Game(x))
    const gamesGroupedByHomeTeamId = _.groupBy(games, 'homeTeamId')
    const gamesGroupedByAwayTeamId = _.groupBy(games, 'awayTeamId')

    // teams
    const dbTeams = await teamDb.getAll()
    const teams = dbTeams.map(x => {
      const team = new Team(x)

      const homeGamesCount = (gamesGroupedByHomeTeamId[x.id] || []).length
      const awayGamesCount = (gamesGroupedByAwayTeamId[x.id] || []).length
      team.setPlayedGamesCount(homeGamesCount + awayGamesCount)

      return team
    })
    const teamsIndexed = _.keyBy(teams, 'id')

    // users
    const dbUsers = await userDb.getAll()
    const users = dbUsers.map(x => {
      const user = new User(x)
      user.setTeam(teamsIndexed[x.teamId])

      return user
    })

    const dbMatchesStats = await statsDb.getMatchesStats()
    const matchesStats = dbMatchesStats.map(x => new MatchStats(x))
    const statsGroupedByHomePlayerId = _.groupBy(matchesStats, 'homePlayerId')
    const statsGroupedByAwayPlayerId = _.groupBy(matchesStats, 'awayPlayerId')

    const dbMatchesStatsByPlayers = await statsDb.getMatchesCountByPlayers()
    const matchesStatsByPlayers = dbMatchesStatsByPlayers.map(x => ({
      playerId: parseInt(x.playerId, 10),
      count: parseInt(x.count, 10)
    }))
    const matchesStatsByPlayersIndexed = _.keyBy(matchesStatsByPlayers, 'playerId')

    return _.chain(users)
      .map(x => {
        const homeStats = statsGroupedByHomePlayerId[x.id] || []
        const awayStats = statsGroupedByAwayPlayerId[x.id] || []
        const stats = homeStats.concat(awayStats)
        const playedMatchesCount = (matchesStatsByPlayersIndexed[x.id] || {}).count || 0

        const y = new PlayerStats(x, stats)
        y.setPlayedMatchesCount(playedMatchesCount)

        return y
      })
      .orderBy(x => [x.all.winsCount, x.all.odds, x.all.drawsCount], ['desc', 'desc', 'desc'])
      .partition(x => x.isActive)
      .value()
  }
}
