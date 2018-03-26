'use strict'

import constants from '../shared/constants'

const utils = {

  parsePlayers: (players) => {
    return Array.isArray(players) ? players.map(x => parseInt(x, 10)) : [parseInt(players, 10)]
  },

  parseMatchWinner: (homeScores, awayScores) => {
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
  },

  parseGameWinner: (homeScore, awayScore) => {
    if (homeScore > awayScore) {
      return constants.winner.HOME
    }

    if (homeScore < awayScore) {
      return constants.winner.AWAY
    }

    return constants.winner.DRAW
  }

}

export default utils
