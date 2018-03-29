'use strict'

import _ from 'lodash'
import {constants} from '../shared'

export default class GameStats {
  constructor(team, games) {
    this.team = team

    // total games count
    this.gamesCount = games.length

    const homeGames = games.filter(x => x.homeTeamId === team.id)
    const awayGames = games.filter(x => x.awayTeamId === team.id)

    // wins
    const homeWins = homeGames.filter(x => x.winner === constants.winner.HOME).length
    const awayWins = awayGames.filter(x => x.winner === constants.winner.AWAY).length
    this.winsCount = homeWins + awayWins

    // wins after draw
    const homeWinsAfterDraw = homeGames.filter(x => x.winner === constants.winner.HOME_WINS_DRAW).length
    const awayWinsAfterDraw = awayGames.filter(x => x.winner === constants.winner.AWAY_WINS_DRAW).length
    this.winsAfterDrawCount = homeWinsAfterDraw + awayWinsAfterDraw

    // draws
    const homeLosesAfterDraw = homeGames.filter(x => x.winner === constants.winner.AWAY_WINS_DRAW).length
    const awayLosesAfterDraw = awayGames.filter(x => x.winner === constants.winner.HOME_WINS_DRAW).length
    this.drawsCount = homeLosesAfterDraw + awayLosesAfterDraw

    // loses
    const homeLoses = homeGames.filter(x => x.winner === constants.winner.AWAY).length
    const awayLoses = awayGames.filter(x => x.winner === constants.winner.HOME).length
    this.losesCount = homeLoses + awayLoses

    // points
    this.points = (this.winsCount + this.winsAfterDrawCount) * constants.points.WIN + this.drawsCount * constants.points.DRAW

    // odds
    const matchesWonCount = _.sumBy(homeGames, 'homeScore') + _.sumBy(awayGames, 'awayScore')
    const matchesLostCount = _.sumBy(homeGames, 'awayScore') + _.sumBy(awayGames, 'homeScore')
    this.odds = matchesWonCount - matchesLostCount
  }
}
