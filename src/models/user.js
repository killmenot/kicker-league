'use strict'

export default class User {
  constructor(dbData = {}) {
    this.id = dbData.id
    this.teamId = dbData.teamId
    this.firstName = dbData.firstName
    this.lastName = dbData.lastName

    this.fullName = `${this.firstName} ${this.lastName}`
  }
}
