'use strict'

import constants from '../shared/constants'

const walkoverValues = [constants.walkover.W, constants.walkover.L]

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

  parseGameWinner: (homeScore, awayScore, penaltiesValues) => {
    if (homeScore > awayScore) {
      return constants.winner.HOME
    }

    if (homeScore < awayScore) {
      return constants.winner.AWAY
    }

    const homePenaltyScores = penaltiesValues.filter(x => x.homeScore).length
    const awayPenaltyScores = penaltiesValues.filter(x => x.awayScore).length

    return homePenaltyScores > awayPenaltyScores ?
      constants.winner.HOME_WINS_DRAW :
      constants.winner.AWAY_WINS_DRAW
  },

  parseWalkover: (homeScore, awayScore) => {
    return walkoverValues.includes(homeScore.toUpperCase()) && walkoverValues.includes(awayScore.toUpperCase())
  },

  parseScore: (s) => {
    return walkoverValues.includes(s.toUpperCase()) ?
      0 :
      parseInt(s, 10);
  },

  buildPenalties: () => {
    return [1, 2, 3, 4, 5].map(x => ({
      position: x
    }))
  }

}

export default utils
