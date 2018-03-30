'use strict'

import _ from 'lodash'

export default class Match {
  constructor(dbData = {}) {
    this.id = dbData.id
    this.gameId = dbData.gameId
    this.position = dbData.position
    this.type = dbData.type
    this.winner = dbData.winner

    this.sets = []
    this.homePlayers = []
    this.awayPlayers = []
  }

  addSets(sets) {
    if (!sets) return

    const newSets = this.sets.concat(sets)
    this.sets = _.sortBy(newSets, x => x.position)
  }

  addHomePlayers(players) {
    if (!players) return

    this.homePlayers = this.homePlayers.concat(players)
  }

  addAwayPlayers(players) {
    if (!players) return

    this.awayPlayers = this.awayPlayers.concat(players)
  }

  get walkover() {
    return _.every(this.sets, x => x.walkover)
  }
}
