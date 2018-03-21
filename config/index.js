'use strict';

require('dotenv').config();

const dbConfig = require('./dbConfig');

module.exports = {
  db: dbConfig,
  auth: {
    username: process.env.AUTH_USERNAME || '',
    password: process.env.AUTH_PASSWORD || '',
  }
};
