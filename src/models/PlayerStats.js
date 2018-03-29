'use strict'

import {constants} from '../shared'

const SINGLE = constants.matchType.SINGLE
const DOUBLE = constants.matchType.DOUBLE

export default class PlayerStats {
  constructor(user, stats) {
    this.user = user

    const homeStats = stats.filter(x => x.homePlayerId === user.id)
    const awayStats = stats.filter(x => x.awayPlayerId === user.id)

    // wins
    const homeWins = homeStats.filter(x => x.winner === constants.winner.HOME)
    const awayWins = awayStats.filter(x => x.winner === constants.winner.AWAY)
    const wins = homeWins.concat(awayWins)

    // draws
    const homeDraws = homeStats.filter(x => x.winner === constants.winner.DRAW)
    const awayDraws = awayStats.filter(x => x.winner === constants.winner.DRAW)
    const draws = homeDraws.concat(awayDraws)

    // loses
    const homeLoses = homeStats.filter(x => x.winner === constants.winner.AWAY)
    const awayLoses = awayStats.filter(x => x.winner === constants.winner.HOME)
    const loses = homeLoses.concat(awayLoses)

    this.single = this.filterByType(stats, wins, draws, loses, [SINGLE])
    this.double = this.filterByType(stats, wins, draws, loses, [DOUBLE])
    this.all = this.filterByType(stats, wins, draws, loses, [SINGLE, DOUBLE])

    this.min = this.user.team.playedGamesCount * constants.MIN_MATCHES_PER_GAME
    this.playedMatchesCount = 0
  }

  get isActive() {
    return this.playedMatchesCount >= this.min
  }

  filterByType(all, wins, draws, loses, typesAllowed) {
    const totalCount = all.filter(x => typesAllowed.includes(x.type)).length
    const winsCount = wins.filter(x => typesAllowed.includes(x.type)).length
    const drawsCount = draws.filter(x => typesAllowed.includes(x.type)).length
    const losesCount = loses.filter(x => typesAllowed.includes(x.type)).length

    return {
      totalCount,
      winsCount,
      drawsCount,
      losesCount,
      odds: winsCount - losesCount
    }
  }

  setPlayedMatchesCount(count) {
    this.playedMatchesCount = count
  }
}
