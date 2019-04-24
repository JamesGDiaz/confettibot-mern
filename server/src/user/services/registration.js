'use strict'

const User = require('../user.model')
const crypto = require('crypto')
const middleware = require('./middleware')

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
  const activationHash = crypto.randomBytes(48).toString('hex')
  const destinationTag = Math.floor(
    Math.random() * (99999999 - 10000000) + 10000000
  )
  if (!email || !passwordData) {
    return callback(new Error('Parameters not found!'))
  }
  const user = new User({
    id,
    email,
    salt: passwordData.salt,
    password: passwordData.password,
    activation: activationHash,
    destination_tag: destinationTag
  })
  user.save((err, user) => {
    if (!err && user) {
      return callback(null, user)
    } else {
      console.log(err)
      return callback(err)
    }
  })
}

/**
 * Activate an existing user
 * @function
 * @param {object} data
 * @param {callback} callback
 */
const activate = (data, callback) => {
  const { hash } = data
  User.findOneAndUpdate(
    { activation: hash },
    {
      $set: {
        active: true,
        activation: null
      }
    },
    {
      new: true
    },
    (err, user) => {
      if (!err && user) {
        return callback(null, user)
      } else {
        return callback(err)
      }
    }
  )
}

/**
 * Activate an existing user because payment was received
 * @function
 * @param {object} data
 * @param {callback} callback
 */
const activationXRP = (data, callback) => {
  const { destinationTag } = data
  User.findOneAndUpdate(
    { destination_tag: destinationTag },
    {
      $set: {
        active: true
      }
    },
    {
      new: true
    },
    (err, user) => {
      if (!err && user) {
        return callback(null, user)
      } else {
        return callback(err)
      }
    }
  )
}

module.exports = {
  register,
  activate,
  activationXRP
}
