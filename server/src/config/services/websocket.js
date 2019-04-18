const path = require('path')
var PythonShell = require('python-shell').PythonShell
var SocketServer = require('ws').Server

const wssApp = new SocketServer({ noServer: true })
const wssMobileAdmin = new SocketServer({ noServer: true })
const wssRelayAdmin = new SocketServer({ noServer: true })

// Setup websocket for complete process (ocr -> search -> broadcast answer)
wssMobileAdmin.on('connection', ws => {
  ws.on('message', data => {
    // let uri = buffer.toString("base64");
    var options = {
      mode: 'text',
      pythonPath: 'python',
      pythonOptions: ['-u'],
      args: [data],
      scriptPath: path.join(__dirname, '../python_scripts/')
    }
    let pyconfettibot = new PythonShell('main.py', options)
    pyconfettibot.on('message', message => {
      wssApp.clients.forEach(client => {
        client.send(message)
      })
      console.log(message)
    })
    pyconfettibot.end(function (err, code, signal) {
      if (err) console.log(err)
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
      console.log("Couldn't seend KEEP-ALIVE")
    }
  }, 30000)
})

module.exports = {
  wssRelayAdmin,
  wssMobileAdmin,
  wssApp
}
