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
    this.homeScore = dbData.homeScore || 0
    this.awayScore = dbData.awayScore || 0
    this.winner = dbData.winner || ''

    this.matches = []
    this.penalties = []
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

  addPenalties(penalties) {
    if (!penalties) return

    const newPenalties = this.penalties.concat(penalties)
    this.penalties = _.sortBy(newPenalties, x => x.position)
  }

  get title() {
    return this.homeTeam && this.awayTeam ?
      `${this.homeTeam.name} - ${this.awayTeam.name} (${this.homeTeam.location})` :
      ''
  }

  get scores() {
    return `${this.homeScore}:${this.awayScore}`
  }
}
