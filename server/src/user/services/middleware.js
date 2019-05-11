'use strict'

const User = require('../user.model')
const bcrypt = require('bcryptjs')

/**
 * Create new password
 * @function
 * @param {string} password
 */
const createPassword = password => {
  if (!password) {
    return false
  }
  const salt = bcrypt.genSaltSync(13)
  const hash = bcrypt.hashSync(password, salt)
  return {
    salt,
    password: hash
  }
}

/**
 * Check current password
 * @function
 * @param {string} email
 * @param {string} password
 * @param {callback} callback
 */
const checkPassword = (email, password, callback) => {
  if (!email || !password) {
    return callback(null)
  }
  User.findOne({ email: email }, (err, user) => {
    if (!err && user && user.length !== 0) {
      const salt = user.salt
      const hash = bcrypt.hashSync(password, salt)
      if (user.password === hash) {
        return callback(null, user)
      } else {
        return callback(new Error('Constrasena incorrecta!'), null)
      }
    } else {
      return callback(err, null)
    }
  })
}

const findLoggedInUser = (userId, callback) => {
  if (!userId) {
    return callback(null, null)
  }
  User.findOne({ id: userId }, (err, user) => {
    if (!err && user && user.length !== 0) {
      return callback(null, user)
    }
    return callback(err, null)
  })
}

module.exports = {
  createPassword,
  checkPassword,
  findLoggedInUser
}
