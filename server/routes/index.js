'use strict'

const homeRoute = require('./home')
const userRoute = require('./user')
const errorRoute = require('./error')
const socketRoute = require('./socket')

/**
 * Initialize routes
 */
const init = app => {
  app.use('*', homeRoute)
  app.use('/api/user', userRoute)
  app.use('*', errorRoute)
  app.use('/api/app', socketRoute)
}

module.exports = {
  init
}
