'use strict'

const crypto = require('crypto')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const { redisClient } = require('../../redis')

const redisStore = new RedisStore({ client: redisClient })

const sessionParser = session({
  store: redisStore,
  secret: crypto.randomBytes(48).toString('hex'),
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: {
    secure: 'auto',
    httpOnly: true,
    maxAge: 60 * 60 * 1000 // 1hr
  }
})

/**
 * Initialize redis for session cache
 */
const init = app => {
  if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1) // trust first proxy
  }
  app.use(sessionParser)
}

module.exports = {
  init,
  sessionParser
}
