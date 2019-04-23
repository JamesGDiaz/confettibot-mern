var PythonShell = require('python-shell').PythonShell
var SocketServer = require('ws').Server
const config = require('./config')

const wssApp = new SocketServer({ noServer: true })
const wssMobileAdmin = new SocketServer({ noServer: true })
const wssRelayAdmin = new SocketServer({ noServer: true })

// Setup websocket for complete process (ocr -> search -> broadcast answer)
wssMobileAdmin.on('connection', ws => {
  console.log(
    `Client connected to /api/admin/mobile. There are ${
      wssMobileAdmin.clients.size
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
      // ws.send(message);
      console.log(message)
    })
    pyconfettibot.end(function (err, code, signal) {
      if (err && !(config.env === 'production')) console.log(err)
    })
  })
  ws.on('close', () => {
    console.log('Client disconnected')
  })
})

// Setup websocket for broadcast of question & answer only
wssRelayAdmin.on('connection', ws => {
  console.log('Client connected on wssRelayAdmin..')
  ws.on('message', message => {
    wssApp.clients.forEach(client => {
      client.send(message)
    })
    console.log('pyconfettibot message: ' + message)
  })
  ws.on('close', () => {
    console.log('Client disconnected')
  })
})

wssApp.on('connection', ws => {
  console.log(
    `Client connected, there are ${wssApp.clients.size} clients connected.`
  )
  ws.send('{"type": "INFO", "message": "Conectado!"}')
  setInterval(() => {
    try {
      ws.send('{"KEEP-ALIVE":"KEEP-ALIVE"}')
    } catch (error) {
      console.log("Couldn't send KEEP-ALIVE")
    }
  }, 30000)
})

module.exports = {
  wssRelayAdmin,
  wssMobileAdmin,
  wssApp
}
