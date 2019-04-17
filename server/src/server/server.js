'use strict'

const {
  config,
  express,
  session,
  passport,
  db,
  show,
  websocket,
  stats
} = require('../config')
const routes = require('../../routes')
const mongoose = require('mongoose')
const spdy = require('spdy')
const Url = require('url-parse')
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
  server = spdy.createServer(config.sslOptions, app).listen(config.port, config.ip)
  show.debug(`Listening at https://${config.host}:${config.port}`)
  routes.init(app)
  websocketConfig(server)
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

/**
 * Websocket endpoints configuration
 * @function
 */
const websocketConfig = (server) => {
  server.on('upgrade', function upgrade (request, socket, head) {
    const pathname = new Url(request.url).pathname
    console.log(pathname)
    if (pathname === '/api/app/') {
      websocket.wssAppBroadcast.handleUpgrade(
        request,
        socket,
        head,
        function done (ws) {
          websocket.wssAppBroadcast.emit('connection', ws, request)
        }
      )
    } else if (pathname === '/api/admin/mobile') {
      websocket.wssMobileAdmin.handleUpgrade(
        request,
        socket,
        head,
        function done (ws) {
          websocket.wssMobileAdmin.emit('connection', ws, request)
        }
      )
    } else if (pathname === '/api/admin/relay') {
      websocket.wssRelayAdmin.handleUpgrade(
        request,
        socket,
        head,
        function done (ws) {
          websocket.wssRelayAdmin.emit('connection', ws, request)
        }
      )
    } else {
      socket.destroy()
    }
  })
}

module.exports = {
  listen,
  close
}
