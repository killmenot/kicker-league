'use strict'

export default class MatchStats {
  constructor(dbData = {}) {
    this.homePlayerId = dbData.homePlayerId
    this.awayPlayerId = dbData.awayPlayerId
    this.winner = dbData.winner
    this.type = dbData.type
  }
}
