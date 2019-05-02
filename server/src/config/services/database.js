'use strict'

const config = require('./config')
const log = require('./logging')
const mongoose = require('mongoose')

/**
 * Connecting to database
 */
const init = () => {
  mongoose.connect(config.mongoUrl, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  const db = mongoose.connection
  error(db)
  open(db)
}

/**
 * Database error
 * @callback
 * @param {object} error
 */
const error = db => {
  db.on('error', error => {
    log.error('Database connection error', error)
  })
}

/**
 * Database connected
 * @callback
 */
const open = db => {
  db.once('open', () => {
    log.info('Database connected succesfully')
  })
}

module.exports = {
  init
}
