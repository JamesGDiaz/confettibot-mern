'use strict'

const config = require('./services/config')
const express = require('./services/express')
const session = require('./services/session')
const db = require('./services/database')
const smtpTransport = require('./services/nodemailer')
const show = require('./services/logging')
const stats = require('./services/stats')
const passport = require('./services/passport')
const websocket = require('./services/websocket')
const socket = require('./services/socketio')

module.exports = {
  config,
  express,
  session,
  show,
  db,
  passport,
  smtpTransport,
  websocket,
  socket,
  stats
}
