'use strict';

if (process.env.CLEARDB_DATABASE_URL) {
  const match = process.env.CLEARDB_DATABASE_URL.match(/mysql:\/\/([^:]+):([^@]+)@([^:]+)\/(.+)\?/);
  process.env.DB_USERNAME = match[1];
  process.env.DB_PASSWORD = match[2];
  process.env.DB_HOSTNAME = match[3];
  process.env.DB_NAME = match[4];
}

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
    protocol: 'mysql',
    port: 3306,
    dialectOptions: {
      ssl: true
    },
    define: {
      underscored: true
    }
  }
};
