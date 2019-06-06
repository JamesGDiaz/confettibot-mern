'use strict'
const User = require('../user.model')
const log = require('../../config/services/logging')
const cron = require('node-cron')
const moment = require('moment')

let deactivateExpiredUsers = cron.schedule(
  '0 0 2 * * *',
  function () {
    log.info('Running deactivation cron job...')
    updateAllProducts((err, res) => {
      if (err) {
        log.error(
          'ERROR while deactivating users whose subscription is expired.'
        )
      } else {
        log.info(`Deactivated ${res.nModified} expired users succesfully!`)
      }
    })
  },
  { scheduled: false }
)

let updateAllProducts = callback => {
  let currentDate = moment()
  User.updateMany(
    {
      expirationDate: {
        $lt: currentDate
      }
    },
    {
      active: false,
      expirationDate: moment.unix(0)
    },
    (err, res) => {
      if (err) {
        callback(err, null)
      } else {
        callback(null, res)
      }
    }
  )
}

module.exports = deactivateExpiredUsers
