var PythonShell = require('python-shell').PythonShell
var SocketServer = require('ws').Server
const config = require('./config')

const wssMobileAdmin = new SocketServer({ noServer: true, maxPayload: 512000 })
const wssRelayAdmin = new SocketServer({ noServer: true })
const wssApp = new SocketServer({
  noServer: true
  /* verifyClient: (info, done) => {
    sessionParser(info.req, {}, () => {
      done(info.req.session)
    })
  } */
})

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
      ws.send(message)
      console.log(message)
    })
    pyconfettibot.end(function (err, code, signal) {
      if (err && !(config.env === 'production')) console.log(err)
    })
  })
  ws.on('close', () => {
    console.log(
      `Client disconnected from /api/admin/mobile. There are ${
        wssMobileAdmin.clients.size
      } clients connected.`
    )
  })
})

// Setup websocket for broadcast of question & answer only
wssRelayAdmin.on('connection', ws => {
  console.log(
    `Client connected to /api/admin/relay. There are ${
      wssRelayAdmin.clients.size
    } clients connected.`
  )
  ws.on('message', message => {
    wssApp.clients.forEach(client => {
      client.send(message)
    })
    console.log('pyconfettibot message: ' + message)
  })
  ws.on('close', () => {
    console.log(
      `Client disconnected from /api/admin/relay. There are ${
        wssRelayAdmin.clients.size
      } clients connected.`
    )
  })
})

wssApp.on('connection', ws => {
  console.log(
    `Client connected on /api/app, there are ${
      wssApp.clients.size
    } clients connected.`
  )
  ws.send('{"type": "INFO", "message": "Conectado!"}')
  ws.on('close', () => {
    console.log(
      `Client disconnected on /api/app, there are ${
        wssApp.clients.size
      } clients connected.`
    )
  })
})

module.exports = {
  wssRelayAdmin,
  wssMobileAdmin,
  wssApp
}
