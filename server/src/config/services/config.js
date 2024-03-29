'use strict'

const path = require('path')
let basePath = path.join(__dirname, '../../../')
const env = process.env.NODE_ENV

if (env === 'production') {
  basePath = './'
}
const envPath = path.join(basePath, `.env/${env}.config.env`)
const envConfig = require('dotenv').config({
  path: envPath
})
if (envConfig.error) {
  throw envConfig.error
}

/**
 * Test config
 */
const test = {
  env,
  host: process.env.HOST,
  port: process.env.PORT,
  url: `http://${process.env.CLIENT_HOST}:${process.env.CLIENT_PORT}`,
  redisUrl: process.env.REDIS_URL,
  emailAddress: process.env.EMAIL_ADDRESS,
  emailPassword: process.env.EMAIL_PASS,
  mongoUrl: `mongodb+srv://${process.env.DB_USER}:${encodeURIComponent(
    process.env.DB_PASS
  )}@${process.env.DB_HOST}`,
  clientStaticFolder: path.join(basePath, 'client/build/static'),
  clientBuildFolder: path.join(basePath, 'client/build'),
  localPyConfettibotUrl: 'ws://192.168.0.3:19010',
  coinPaymentsMerchantID: process.env.COINPAYMENTS_MERCHANTID,
  coinPaymentsIPNSecret: process.env.COINPAYMENTS_IPN_SECRET
}

/**
 * Development config
 */
const development = {
  env,
  host: process.env.HOST,
  port: process.env.PORT,
  url: `http://${process.env.CLIENT_HOST}:${process.env.CLIENT_PORT}`,
  redisUrl: process.env.REDIS_URL,
  emailAddress: process.env.EMAIL_ADDRESS,
  emailPassword: process.env.EMAIL_PASS,
  mongoUrl: `mongodb+srv://${process.env.DB_USER}:${encodeURIComponent(
    process.env.DB_PASS
  )}@${process.env.DB_HOST}`,
  clientStaticFolder: path.join(basePath, 'client/build/static'),
  clientBuildFolder: path.join(basePath, 'client/build'),
  localPyConfettibotUrl: 'ws://192.168.0.3:19010',
  coinPaymentsMerchantID: process.env.COINPAYMENTS_MERCHANTID,
  coinPaymentsIPNSecret: process.env.COINPAYMENTS_IPN_SECRET
}
/**
 * Production config
 */
const production = {
  env,
  host: process.env.HOST,
  port: process.env.PORT,
  url: `http://${process.env.CLIENT_HOST}:${process.env.CLIENT_PORT}`,
  redisUrl: process.env.REDIS_URL,
  emailAddress: process.env.EMAIL_ADDRESS,
  emailPassword: process.env.EMAIL_PASS,
  mongoUrl: `mongodb+srv://${process.env.DB_USER}:${encodeURIComponent(
    process.env.DB_PASS
  )}@${process.env.DB_HOST}`,
  clientStaticFolder: path.join(basePath, 'client/static'),
  clientBuildFolder: path.join(basePath, 'client'),
  localPyConfettibotUrl: 'ws://localhost:19010',
  coinPaymentsMerchantID: process.env.COINPAYMENTS_MERCHANTID,
  coinPaymentsIPNSecret: process.env.COINPAYMENTS_IPN_SECRET
}

const config = {
  test,
  development,
  production
}

module.exports = config[env]
