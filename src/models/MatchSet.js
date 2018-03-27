'use strict'

import {constants} from '../shared'

export default class MatchSet {
  constructor(dbData = {}) {
    this.id = dbData.id
    this.matchId = dbData.matchId
    this.position = dbData.position
    this.winner = dbData.winner
    this.walkover = dbData.walkover || false

    if (this.walkover) {
      this.homeScore = this.winner === constants.winner.HOME ?
        constants.walkover.W :
        constants.walkover.L
      this.awayScore = this.winner === constants.winner.AWAY ?
        constants.walkover.W :
        constants.walkover.L
    } else {
      this.homeScore = dbData.homeScore
      this.awayScore = dbData.awayScore
    }

  }
}
