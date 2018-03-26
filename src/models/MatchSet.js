'use strict'

export default class MatchSet {
  constructor(dbData = {}) {
    this.id = dbData.id
    this.matchId = dbData.matchId
    this.position = dbData.position
    this.homeScore = dbData.homeScore
    this.awayScore = dbData.awayScore
    this.winner = dbData.winner
    this.walkover = dbData.walkover
  }
}
