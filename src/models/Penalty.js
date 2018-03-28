'use strict'

export default class Penalty {
  constructor(dbData = {}) {
    this.id = dbData.id
    this.gameId = dbData.gameId
    this.position = dbData.position
    this.homePlayerId = dbData.homePlayerId
    this.awayPlayerId = dbData.awayPlayerId
    this.homeScore = dbData.homeScore
    this.awayScore = dbData.awayScore
  }

  setHomePlayer(player) {
    if (!player) return

    this.homePlayer = player
  }

  setAwayPlayer(player) {
    if (!player) return

    this.awayPlayer = player
  }
}
