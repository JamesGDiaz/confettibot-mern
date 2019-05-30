'use strict'

const User = require('../user.model')
const crypto = require('crypto')
const middleware = require('./middleware')
const log = require('../../config/services/logging')
const moment = require('moment')

/**
 * Register a new user
 * @function
 * @param {object} data
 * @param {callback} callback
 */
const register = (data, callback) => {
  const { email, password } = data
  const passwordData = middleware.createPassword(password)
  const id = crypto.randomBytes(24).toString('hex')
  const now = moment()
  if (!email || !passwordData) {
    return callback(new Error('Parameters not found!'))
  }
  const user = new User({
    id,
    email,
    salt: passwordData.salt,
    password: passwordData.password,
    registerDate: now
  })
  user.save((err, user) => {
    if (!err && user) {
      return callback(null, user)
    } else {
      log.error(err)
      return callback(err)
    }
  })
}

module.exports = {
  register
}
