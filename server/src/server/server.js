'use strict'

const {
  config,
  express,
  session,
  passport,
  db,
  show,
  socket,
  websocket,
  stats
} = require('../config')
const routes = require('../../routes')
const mongoose = require('mongoose')
const http = require('http')
let server = null

/**
 * Start HTTP/2 server, database, socket.io connection
 * Load routes, services, check memory usage
 * @function
 */
const listen = () => {
  const app = express.init()
  session.init(app)
  passport.init(app)
  db.init()
  server = http.createServer(app).listen(config.port)
  show.debug(`Listening at http://${config.host}:${config.port}`)
  socket.listen(server, app)
  websocket.init(server)
  routes.init(app)
  stats.memory()
}

/**
 * Close server, database connection
 * @function
 */
const close = () => {
  server.close()
  mongoose.disconnect()
  show.debug('Server down')
}

module.exports = {
  listen,
  close
}
