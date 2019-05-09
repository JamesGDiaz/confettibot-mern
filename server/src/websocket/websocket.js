// const PythonShell = require('python-shell').PythonShell
const WebSocket = require('ws')
const config = require('../config/services/config')
const sessionParser = require('../config/services/session').sessionParser
const log = require('../config/services/logging')

const wsCftbtClient = new WebSocket(config.localPyConfettibotUrl)
const wssAppServer = new WebSocket.Server({
  noServer: true,
  maxPayload: 512000
})
const wssApp = new WebSocket.Server({
  noServer: true,
  verifyClient: function (info, done) {
    sessionParser(info.req, {}, () => {
      if (info.req.session.passport && info.req.session.passport.user) {
        done(info.req.session.passport.user)
      } else done(false, 401, 'No autorizado.', null)
    })
  }
})

// Setup websocket for complete process ( search -> broadcast answer)
wssApp.on('connection', (ws, req) => {
  let ip = null
  if (process.env.NODE_ENV === 'production') {
    ip = req.headers['x-forwarded-for'].split(/\s*,\s*/)[0]
  } else ip = req.connection.remoteAddress
  log.info(
    `[IP: ${ip}] [${wssApp.clients.size}] Connection to /api/app accepted [${
      req.session.passport.user
    }]`
  )
  ws.send('{"type": "INFO", "message": "Conectado!"}')
  ws.on('close', () => {
    log.info(
      `[IP: ${ip}] [${
        wssApp.clients.size
      }]  Client disconnected from /api/app [${req.session.passport.user}]`
    )
  })
})

wssAppServer.on('connection', (ws, req) => {
  let ip = null
  if (process.env.NODE_ENV === 'production') {
    ip = req.headers['x-forwarded-for'].split(/\s*,\s*/)[0]
  } else ip = req.connection.remoteAddress
  log.info(
    `[IP: ${ip}] [${
      wssAppServer.clients.size
    }] Client connected to /api/app/server`
  )
  ws.send('{"type": "INFO", "message": "Conectado!"}')
  ws.on('message', data => {
    wsCftbtClient.send(data)
  })
  ws.on('close', () => {
    log.info(
      `[IP: ${ip}] [${
        wssAppServer.clients.size
      }] Client disconnected from /api/app/server`
    )
  })
})

wsCftbtClient.on('open', function open () {
  log.info('connected to pyConfettibot')
  // ws.send(Date.now());
})

wsCftbtClient.on('close', function close () {
  log.error('disconnected from pyConfettibot')
})

wsCftbtClient.on('message', function incoming (message) {
  wssApp.clients.forEach(client => {
    client.send(message)
  })
  wssAppServer.clients.forEach(client => {
    client.send(message)
  })
  let out = JSON.parse(message)
  log.info(`[${out.type}] ${out.message}`)
})

module.exports = {
  wssAppServer,
  wssApp
}
