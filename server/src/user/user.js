'use strict'

require('./services/login')
const logout = require('./services/logout')
const { register, activate } = require('./services/registration')
const { recovery, recoveryHash } = require('./services/recovery')
const { profileUpdate, profileRemove } = require('./services/profile')
const mail = require('../common/services/email')
const { show } = require('../config')
const passport = require('passport')
const action = {}

/**
 * Check login
 */
action.checkLogin = (req, res) => {
  if (req.isAuthenticated()) {
    show.debug('Logged in!')
  } else {
    show.debug('Not logged in!')
  }
}

/**
 * Login
 */
action.login = (req, res, next) => {
  show.debug('Logging in...')
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      show.debug('Login error!')
      return res.json({
        type: 'login',
        success: false
      })
    }
    if (!user) {
      show.debug('User not found!')
      return res.json({
        type: 'login',
        success: false
      })
    }
    req.login(user, err => {
      if (!err && user) {
        show.debug('Login success!')
        const data = {
          id: user[0].id,
          email: user[0].email,
          age: user[0].age,
          location: user[0].location
        }
        return res.json({
          type: 'login',
          success: true,
          user: data
        })
      } else {
        show.debug('Login error!')
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
  show.debug('Logging out...')
  logout(req, err => {
    if (!err) {
      show.debug('Logout success!')
      return res.json({
        type: 'logout',
        success: true
      })
    } else {
      show.debug('Logout failed!')
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
  show.debug('Registrating...')
  const data = req.body
  register(data, (err, user) => {
    if (!err && user) {
      show.debug('Registration success! activation hash: ' + user.activation)
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
      show.debug('Registration failed!')
      return res.json({
        type: 'registration',
        success: false
      })
    }
  })
}

/**
 * Activation
 */
action.activation = (req, res, next) => {
  const data = req.body
  show.debug('Activating...')
  activate(data, (err, user) => {
    if (!err && user) {
      show.debug('Activation success!')
      return res.json({
        type: 'activation',
        success: true
      })
    } else {
      show.debug('Activation failed!')
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
  show.debug('Recovery...')
  if (!data.hash) {
    recovery(data, (err, user) => {
      if (!err && user) {
        mail.send(
          {
            to: user.email,
            subject: 'Confettibot | Recuperar contraseña',
            content:
              '<h1>Recovery</h1>Haz click <a href="https://confettibot.com/recovery/"' +
              user.recovery +
              '</a>'
          },
          (err, sent) => {
            if (!err && sent) {
              show.debug('Recovery success!')
              return res.json({
                type: 'recovery',
                success: true
              })
            } else {
              show.debug('Recovery failed!')
              return res.json({
                type: 'recovery',
                success: false
              })
            }
          }
        )
      } else {
        show.debug('Recovery failed!')
        return res.json({
          type: 'recovery',
          success: false
        })
      }
    })
  } else {
    recoveryHash(data, (err, user) => {
      if (!err && user) {
        show.debug('Recovery success!')
        return res.json({
          type: 'recovery',
          success: true
        })
      } else {
        show.debug('Recovery failed!')
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
  show.debug('Changing password...')
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
  show.debug('Changing profile...')
  profileUpdate(data, (err, user) => {
    if (!err && user) {
      show.debug('Profile change success!')
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
      show.debug('Profile change failed!')
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
  show.debug('Removing user...')
  profileRemove(data, err => {
    if (!err) {
      show.debug('Profile remove success!')
      return res.json({
        type: 'profileremove',
        success: true
      })
    } else {
      show.debug('Profile remove failed!')
      return res.json({
        type: 'profileremove',
        success: false
      })
    }
  })
}

/**
 * Payment for activation received
 */
action.activationPayment = (req, res, next) => {
  show.debug('not implemented')
  /* const data = req.body
  show.debug(data)
  activationPayment(data, err => {
    if (!err && user) {
      show.debug('Payment confirmed, activation success!')
      return res.json({
        type: 'activation',
        success: true
      })
    } else {
      show.debug('Activation failed!')
      return res.json({
        type: 'activation',
        success: false
      })
    }
  }) */
}

module.exports = action
