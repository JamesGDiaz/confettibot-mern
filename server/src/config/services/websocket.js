const websocket = require('../../websocket')
const Url = require('url-parse')

/**
 * Websocket endpoints configuration
 * @function
 */
const init = server => {
  server.on('upgrade', function upgrade (request, socket, head) {
    const pathname = new Url(request.url).pathname
    if (pathname === '/api/app') {
      websocket.wssApp.handleUpgrade(request, socket, head, function done (ws) {
        websocket.wssApp.emit('connection', ws, request)
      })
    } else if (pathname === '/api/app/server') {
      websocket.wssAppServer.handleUpgrade(request, socket, head, function done (
        ws
      ) {
        websocket.wssAppServer.emit('connection', ws, request)
      })
    } else {
      socket.destroy()
    }
  })
}

module.exports = {
  init
}
