'use strict'

import moment from 'moment'
import _ from 'lodash'

export default class Game {
  constructor(dbData = {}) {
    this.id = dbData.id || 0
    this.date = dbData.date ?
      moment(dbData.date, 'DD-MM-YYYY').format('MM/DD/YYYY') :
      ''
    this.homeTeamId = dbData.homeTeamId || 0
    this.awayTeamId = dbData.awayTeamId || 0
    this.homeScore = dbData.homeScore || -1
    this.awayScore = dbData.awayScore || -1
    this.winner = dbData.winner || ''
    this.walkover = dbData.walkover || false

    this.matches = []
  }

  setHomeTeam(team) {
    if (!team) return

    this.homeTeam = team
  }

  setAwayTeam(team) {
    if (!team) return

    this.awayTeam = team
  }

  addMatches(matches) {
    if (!matches) return

    const newMatches = this.matches.concat(matches)
    this.matches = _.sortBy(newMatches, x => x.position)
  }

  get title() {
    return this.homeTeam && this.awayTeam ?
      `${this.homeTeam.name} - ${this.awayTeam.name} (${this.homeTeam.location})` :
      ''
  }
}
