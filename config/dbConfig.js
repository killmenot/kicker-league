'use strict';

module.exports = {
  development: {
    dialect: 'sqlite',
    storage: './db.development.sqlite',
    define: {
      underscored: true
    }
  },
  test: {
    dialect: 'sqlite',
    storage: ':memory:',
    define: {
      underscored: true
    }
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    dialect: 'mysql',
    define: {
      underscored: true
    }
  }
};
