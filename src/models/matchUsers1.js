'use strict'

//TODO: rename to MatchPlayers

export default class MatchUsers {
  constructor(dbData = {}) {
    this.matchId = dbData.matchId
    this.position = dbData.position
    this.homePlayerId = dbData.homePlayerId
    this.awayPlayerId = dbData.awayPlayerId
  }
}
