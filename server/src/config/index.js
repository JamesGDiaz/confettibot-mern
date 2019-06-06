'use strict'

const config = require('./services/config')
const express = require('./services/express')
const session = require('./services/session')
const db = require('./services/database')
const smtpTransport = require('./services/nodemailer')
const log = require('./services/logging')
const stats = require('./services/stats')
const passport = require('./services/passport')
const websocket = require('./services/websocket')
const redis = require('./services/redis')

module.exports = {
  config,
  express,
  session,
  log,
  db,
  passport,
  smtpTransport,
  websocket,
  stats,
  redis
}
