'use strict'

require('./services/login')
const logout = require('./services/logout')
const { register, activationXRP } = require('./services/registration')
const { recovery, recoveryHash } = require('./services/recovery')
const { profileUpdate, profileRemove } = require('./services/profile')
const mail = require('../common/services/email')
const { log } = require('../config')
const passport = require('passport')
const action = {}

/**
 * Check login
 */
action.checkLogin = (req, res) => {
  log.verbose(`Checking if requester is logged in.`, req.session)
  if (req.isAuthenticated()) {
    log.verbose('Logged in!')
  } else {
    log.verbose('Not logged in!')
  }
  return res.json({
    type: 'checklogin',
    success: req.isAuthenticated()
  })
}

/**
 * Login
 */
action.login = (req, res, next) => {
  log.debug('Logging in...')
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      log.eror('Login error (server)!')
      return res.json({
        type: 'login',
        success: false
      })
    }
    if (!user) {
      log.debug('User not found!')
      return res.json({
        type: 'login',
        success: false
      })
    }
    req.login(user, err => {
      if (!err && user) {
        log.info(`User logged in [ID: ${req.session.passport.user}`)
        const data = {
          email: user.email,
          destination_tag: user.destination_tag
        }
        return res.json({
          type: 'login',
          success: true,
          user: data
        })
      } else {
        log.debug('Login error!')
        return res.json({
          type: 'login',
          success: false
        })
      }
    })
  })(req, res, next)
}

/**
 * Logout
 */
action.logout = (req, res, next) => {
  log.debug('Logging out...')
  logout(req, err => {
    if (!err) {
      log.debug('Logout success!')
      return res.json({
        type: 'logout',
        success: true
      })
    } else {
      log.debug('Logout failed!')
      return res.json({
        type: 'logout',
        success: false
      })
    }
  })
}

/**
 * Registration
 */
action.registration = (req, res, next) => {
  log.debug('Registrating...')
  const data = req.body
  register(data, (err, user) => {
    if (!err && user) {
      log.debug('Registration success! activation hash: ' + user.activation)
      mail.send(
        {
          to: data.email,
          subject: 'Confettibot | Registro',
          content:
            '<hr /><h2 style="text-align: center;"> Bienvenido/a!</h2>' +
            '<h2 style="text-align: center;">Tu registro fue exitoso!</h2>' +
            '<h3 style="text-align: center;">Para activar tu cuenta, sigue las ' +
            '<a href="https://www.confettibot.com/instrucciones" target="_new">instrucciones</a>. <br /><br />Tu destination tag es:</h3> ' +
            '<h1 style="text-align: center;"><strong>' +
            user.destination_tag +
            '</strong></h1><hr />'
        },
        (error, sent) => {
          if (!error && sent) {
            return res.json({
              type: 'registration',
              success: true
            })
          } else {
            return res.json({
              type: 'registration',
              success: true
            })
          }
        }
      )
    } else {
      log.debug('Registration failed!')
      return res.json({
        type: 'registration',
        success: false
      })
    }
  })
}

/**
 * Payment for activation received
 */
action.activationXRP = (req, res, next) => {
  const data = req.body
  activationXRP(data, (err, user) => {
    if (!err && user) {
      log.info(
        `Payment confirmed, activation success! [Dest Tag: ${
          user.destination_tag
        }]`
      )
      mail.send(
        {
          to: user.email,
          subject: 'Confettibot | Tu cuenta ha sido activada.',
          content:
            '<hr /><h2 style="text-align: center;"> Bienvenido/a!</h2>' +
            '<h2 style="text-align: center;">Tu cuenta ha sido activada. Muchas gracias.</h2>' +
            '<h3 style="text-align: center;">Ahora puedes iniciar sesión ' +
            '<a href="https://www.confettibot.com/login" target="_new">aquí</a>.<br /><br />' +
            'A ganar mucho pero mucho dinero!!!</h3> <hr />'
        },
        (error, sent) => {
          if (!error && sent) {
            return res.json({
              type: 'activation',
              success: true
            })
          } else {
            return res.json({
              type: 'activation',
              success: true
            })
          }
        }
      )
    } else {
      log.error('Activation failed!')
      return res.json({
        type: 'activation',
        success: false
      })
    }
  })
}

/**
 * Password reset
 */
action.recovery = (req, res, next) => {
  const data = req.body
  log.debug('Recovery...')
  if (!data.hash) {
    recovery(data, (err, user) => {
      if (!err && user) {
        mail.send(
          {
            to: user.email,
            subject: 'Confettibot | Recuperar contraseña',
            content:
              '<h1>Recovery</h1>Haz click <a href="https://confettibot.com/recovery/" target="_new">' +
              user.recovery +
              '</a> para cambiar tu contraseña.'
          },
          (err, sent) => {
            if (!err && sent) {
              log.debug('Recovery success!')
              return res.json({
                type: 'recovery',
                success: true
              })
            } else {
              log.debug('Recovery failed!')
              return res.json({
                type: 'recovery',
                success: false
              })
            }
          }
        )
      } else {
        log.debug('Recovery failed!')
        return res.json({
          type: 'recovery',
          success: false
        })
      }
    })
  } else {
    recoveryHash(data, (err, user) => {
      if (!err && user) {
        log.debug('Recovery success!')
        return res.json({
          type: 'recovery',
          success: true
        })
      } else {
        log.debug('Recovery failed!')
        return res.json({
          type: 'recovery',
          success: false
        })
      }
    })
  }
}

/**
 * Password change
 */
action.passChange = (req, res, next) => {
  log.debug('Changing password...')
  return res.json({
    type: 'passchange',
    result: 'Not implemented!'
  })
}

/**
 * Profile change
 */
action.profileUpdate = (req, res, next) => {
  const data = req.body
  log.debug('Changing profile...')
  profileUpdate(data, (err, user) => {
    if (!err && user) {
      log.debug('Profile change success!')
      const data = {
        id: user.id,
        email: user.email,
        age: user.age,
        location: user.location
      }
      return res.json({
        type: 'profileupdate',
        success: true,
        user: data
      })
    } else {
      log.debug('Profile change failed!')
      return res.json({
        type: 'profileupdate',
        success: false
      })
    }
  })
}

/**
 * Profile remove
 */
action.profileRemove = (req, res, next) => {
  const data = req.body
  log.debug('Removing user...')
  profileRemove(data, err => {
    if (!err) {
      log.debug('Profile remove success!')
      return res.json({
        type: 'profileremove',
        success: true
      })
    } else {
      log.debug('Profile remove failed!')
      return res.json({
        type: 'profileremove',
        success: false
      })
    }
  })
}

module.exports = action
