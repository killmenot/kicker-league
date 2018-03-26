'use strict'

export default class Team {
  constructor(dbData = {}) {
    this.id = dbData.id
    this.name = dbData.name
    this.location = dbData.location
  }
}
