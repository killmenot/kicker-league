'use strict'

import constants from '../shared/constants'

const utils = {

  underscoreToCamel: (s) => s.replace(/_([a-z])/g, (g) => g[1].toUpperCase()),

  parsePlayers: (players) => {
    return Array.isArray(players) ? players.map(x => parseInt(x, 10)) : [parseInt(players, 10)]
  },

  parseMatchWinner: (homeScores, awayScores) => {
    console.log(homeScores, awayScores)
    if (homeScores[0] > awayScores[0] && homeScores[1] > awayScores[1]) {
      return constants.winner.HOME
    }

    if (homeScores[0] < awayScores[0] && homeScores[1] < awayScores[1]) {
      return constants.winner.AWAY
    }

    return constants.winner.DRAW
  },

  parseSetWinner: (homeScore, awayScore) => {
    if (homeScore > awayScore) {
      return constants.winner.HOME
    }

    if (homeScore < awayScore) {
      return constants.winner.AWAY
    }

    throw new Error('There is no draw in set.')
  }
}

export default utils
