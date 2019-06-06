const WebSocket = require('ws')
const config = require('../config/services/config')
const sessionParser = require('../config/services/session').sessionParser
const log = require('../config/services/logging')
const User = require('../user/user.model')
const { broadcastPushNotification } = require('../user/services/push')
const { redisClient } = require('../redis')

let pushTokens = []

const verifyActivation = (myuser, callback) => {
  log.verbose('Verifying activations')
  User.findOne({ id: myuser }, (err, user) => {
    if (!err && user && user.length !== 0 && user.active) {
      log.verbose('User is active')
      return callback(null, true)
    } else if (err) {
      return callback(err)
    } else {
      log.verbose('User is NOT active')
      return callback(null, false)
    }
  })
}

const wsCftbtClient = new WebSocket(config.localPyConfettibotUrl)
const wssAppServer = new WebSocket.Server({
  noServer: true,
  maxPayload: 512000
})
const wssApp = new WebSocket.Server({
  noServer: true,
  verifyClient: function (info, done) {
    sessionParser(info.req, {}, () => {
      if (!!info.req.session.passport && !!info.req.session.passport.user) {
        verifyActivation(info.req.session.passport.user, (err, isactive) => {
          if (!err && isactive) {
            log.verbose('Accepting websocket connection')
            done(info.req.session.passport.user)
          } else if (err) {
            done(false, 401, 'No autorizado.', null)
          }
        })
      } else {
        log.verbose('Rejecting websocket connection')
        done(false, 401, 'No autorizado.', null)
      }
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
})

wsCftbtClient.on('close', function close () {
  log.error('disconnected from pyConfettibot')
})

wsCftbtClient.on('message', function incoming (message) {
  // Find all pushTokens from all documents only on the first message, all push tokens that are activated after this are not taken into account
  // until a websocket server is connected again
  log.verbose('Retrieving pushTokens from redis server...')
  let start = Date.now()
  redisClient.smembers('pushTokens', (err, pushTokenList) => {
    if (err) {
      log.error('Error while searching database for pushTokens')
    } else {
      for (let pushToken of pushTokenList) {
        if (pushToken.pushToken !== '') pushTokens = pushTokenList
      }
      let end = Date.now()
      log.verbose(`Redis query took ${end - start}ms`)
    }
  })

  // Send message to all connected clients and users with pushToken id set on the database.
  let out = JSON.parse(message)
  if (out.type !== 'INFO') {
    if (out.type === 'QUESTION') {
      out.type = 'Pregunta'
    } else if (out.type === 'ANSWER') {
      out.type = 'Respuesta'
    }
    // Only send push notifications while in production
    // if (process.env.NODE_ENV === 'production') { broadcastPushNotification(pushTokens, out.type, out.message) }
    broadcastPushNotification(pushTokens, out.type, out.message) // comment this when publishing!
  }

  wssApp.clients.forEach(client => {
    client.send(message)
  })

  wssAppServer.clients.forEach(client => {
    client.send(message)
  })

  log.info(`[${out.type}] ${out.message}`)
})

module.exports = {
  wssAppServer,
  wssApp
}
