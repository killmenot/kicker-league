'use strict'

import fs from 'fs'
import path from 'path'
import Sequelize from 'sequelize'
import {logger} from '../../core'

const db = {}
const basename = path.basename(__filename)
const env = process.env.NODE_ENV || 'development'
const dbConfig = require(path.join(__dirname, '../../../config/dbConfig.js'))[env]

dbConfig.logging = (...args) => logger.debug.apply(logger, args)

const sequelize = dbConfig.use_env_variable ?
  new Sequelize(process.env[dbConfig.use_env_variable], dbConfig) :
  new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig)
const ucfirst = (s) => s.charAt(0).toUpperCase() + s.slice(1)

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file))
    db[ucfirst(model.name)] = model
  })

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

export default db
