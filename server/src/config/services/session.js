'use strict'

const crypto = require('crypto')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const config = require('./config')

const options = {
  url: config.redisUrl
}
const redisStore = new RedisStore(options)

const sessionParser = session({
  store: redisStore,
  secret: crypto.randomBytes(48).toString('hex'),
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: {
    maxAge: 20 * 10000 // 10 minutes
  }
})

/**
 * Initialize redis for session cache
 */
const init = app => {
  app.use(sessionParser)
}

module.exports = {
  init,
  sessionParser
}
