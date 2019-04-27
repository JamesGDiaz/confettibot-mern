var PythonShell = require('python-shell').PythonShell
var SocketServer = require('ws').Server
const config = require('../config/services/config')

const wssAppServer = new SocketServer({ noServer: true, maxPayload: 512000 })
const wssApp = new SocketServer({ noServer: true })

// Setup websocket for complete process ( search -> broadcast answer)
wssApp.on('connection', (ws, req) => {
  let ip = null
  if (process.env.NODE_ENV === 'production') {
    ip = req.headers['x-forwarded-for'].split(/\s*,\s*/)[0]
  } else ip = req.connection.remoteAddress
  console.log(
    `[IP: ${ip}] Client connected on /api/app, there are ${
      wssApp.clients.size
    } clients connected.`
  )
  ws.send('{"type": "INFO", "message": "Conectado!"}')
  ws.on('close', () => {
    console.log(
      `[IP: ${ip}] Client disconnected from /api/app. There are ${
        wssAppServer.clients.size
      } clients connected.`
    )
  })
})

wssAppServer.on('connection', (ws, req) => {
  let ip = null
  if (process.env.NODE_ENV === 'production') {
    ip = req.headers['x-forwarded-for'].split(/\s*,\s*/)[0]
  } else ip = req.connection.remoteAddress
  console.log(
    `[IP: ${ip}] Client connected to /api/app/server. There are ${
      wssAppServer.clients.size
    } clients connected.`
  )
  ws.send('{"type": "INFO", "message": "Conectado!"}')
  ws.on('message', data => {
    let uri = data.toString('base64')
    var options = {
      mode: 'text',
      pythonPath: 'python3',
      pythonOptions: ['-u'],
      args: [uri],
      scriptPath: config.pythonScriptsFolder
    }
    let pyconfettibot = new PythonShell('main.py', options)
    pyconfettibot.on('message', message => {
      wssApp.clients.forEach(client => {
        client.send(message)
      })
      ws.send(message)
      console.log(message)
    })
    pyconfettibot.end(function (err, code, signal) {
      if (err && !(config.env === 'production')) console.log(err)
    })
  })
  ws.on('close', () => {
    console.log(
      `[IP: ${ip}] Client disconnected from /api/app/server. There are ${
        wssAppServer.clients.size
      } clients connected.`
    )
  })
})

module.exports = {
  wssAppServer,
  wssApp
}
