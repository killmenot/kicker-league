'use strict'

import {logger} from '../core'
import db from './models'

const transaction = async (fn) => await db.sequelize.transaction(fn)

export default (Model) => ({
  getAll: async () => {
    logger.info('db/dbBase|getAll')

    return await Model.findAll()
  },

  getById: async (id) => {
    logger.info('db/dbBase|getById', {id})

    return await Model.findById(id);
  },

  getByIds: async (ids) => {
    logger.info('db/dbBase|getByIds', {ids})

    const options = {
      where: {
        id: ids
      }
    }

    return await Model.findAll(options)
  },

  insert: async (values, {transaction} = {}) => {
    logger.info('db/dbBase|insert', {values})

    const options = {}

    if (transaction) {
      options.transaction = transaction
    }

    return await Model.create(values, options)
  },

  insertBulk: async (records, {transaction} = {}) => {
    logger.info('db/dbBase|insertBulk', {records})

    const options = {}

    if (transaction) {
      options.transaction = transaction
    }

    return await Model.bulkCreate(records, options)
  },

  update: async (id, values, {transaction} = {}) => {
    logger.info('db/dbBase|update', {id, values})

    const options = {
      where: {
        id: id
      }
    }

    if (transaction) {
      options.transaction = transaction
    }

    // .update returns two values in an array, therefore we should use .spread
    return await Model.update(values, options)
  },

  // updateBulk: async (records) => {
  //   logger.info('db/dbBase|updateBulk', {records})

  //   return await Model.upda(records)
  // },

  delete: async (id, {transaction} = {}) => {
    logger.info('db/dbBase|delete', {id})

    const options = {
      where: {
        id: id
      }
    }

    if (transaction) {
      options.transaction = transaction
    }

    return await Model.destroy(options)
  },

  deleteBulk: async (ids, {transaction} = {}) => {
    logger.info('db/dbBase|deleteBulk', {ids})

    const options = {
      where: {
        id: ids
      }
    }

    if (transaction) {
      options.transaction = transaction
    }

    return await Model.destroy(options)
  },

  getLastInsertedId: async () => {
    logger.info('db/dbBase|getLastInsertedId')

    const dbData = await Model.max('id')

    return isNaN(dbData) ?
      0 :
      dbData
  }
})

export {
  transaction
}
