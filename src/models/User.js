'use strict'

export default class User {
  constructor(dbData = {}) {
    this.id = dbData.id
    this.teamId = dbData.teamId
    this.firstName = dbData.firstName
    this.lastName = dbData.lastName

    this.fullName = `${this.lastName} ${this.firstName}`
  }

  setTeam(team) {
    if (!team) return

    this.team = team
  }
}
