'use strict'

export default class Team {
  constructor(dbData = {}) {
    this.id = dbData.id
    this.name = dbData.name
    this.location = dbData.location
    this.abbreviation = dbData.abbreviation
    this.playedGamesCount = 0
  }

  setPlayedGamesCount(count) {
    this.playedGamesCount = count
  }
}
