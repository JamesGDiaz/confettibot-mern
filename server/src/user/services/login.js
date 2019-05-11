'use strict'

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const middleware = require('./middleware')
const User = require('../user.model')
const log = require('../../config/services/logging')
/**
 * Find an user by email and password
 * @function
 * @param {string} email
 * @param {string} password
 * @param {callback} callback
 */
const findUser = (email, password, callback) => {
  middleware.checkPassword(email, password, (err, user) => {
    if (!err && user) {
      return callback(null, user)
    } else {
      return callback(null)
    }
  })
}

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  log.debug('deserializing user...\n')
  User.findOne({ id: id }, function (err, user) {
    done(err, user)
  })
})

/**
 * Passport localstrategy
 */
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    (email, password, done) => {
      if (!email || !password) {
        return done(null, false)
      }
      findUser(email, password, (err, user) => {
        if (err) {
          return done(err)
        }
        if (!user || user === undefined || user.length === 0) {
          return done(null, false)
        }
        return done(null, user)
      })
    }
  )
)
