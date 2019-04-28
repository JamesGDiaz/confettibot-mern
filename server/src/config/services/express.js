'use strict'

const config = require('./config')
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
const cors = require('cors')

const corsOptions = {
  origin: [
    'http://localhost:3002',
    'http://localhost:5000',
    'https://confettibot.com',
    'https://www.confettibot.com'
  ],
  credentials: true
}
/**
 * Express configuration
 * @function
 */
const init = () => {
  const app = express()
  app.use(helmet())
  app.use(cors(corsOptions))
  app.use('/build/static', express.static(config.clientStaticFolder))
  app.use('/build', express.static(config.clientBuildFolder))
  app.set('views', config.clientBuildFolder)
  app.engine('html', require('ejs').renderFile)
  app.set('view engine', 'html')
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(cookieParser())
  return app
}

module.exports = {
  init
}
