'use strict'
const crypto = require('crypto')
const moment = require('moment')
const config = require('../../config')
const User = require('../user.model')
const log = require('../../config/services/logging')
const mail = require('../../common/services/email')

moment().format()

const debugEmail = 'confettibotmx@gmail.com'
const merchantID = config.coinPaymentsMerchantID
const ipnSecret = config.coinPaymentsIPNSecret
const orderCurrency = 'MXN'
var orderTotal = 179.0

function errorAndDie (errorMsg, req = null) {
  let reqstring = JSON.stringify({ headers: req.headers, body: req.body })
  let report = `Error: ${errorMsg}\n\nRequest:\n\n${reqstring}`
  mail.send(
    {
      to: debugEmail,
      subject: 'CoinPayments IPN Error',
      content: report
    },
    (error, sent) => {
      if (!error && sent) {
      } else {
      }
    }
  )
  log.error('IPN Error: ' + errorMsg)
}

/**
 * Activate an existing user
 * @function
 * @param {object} req
 * @param {callback} callback
 */
const activate = (req, callback) => {
  console.log(req)
  if (req.body.ipn_mode !== 'hmac') {
    errorAndDie('IPN Mode is not HMAC', req)
    return callback(null, null)
  }

  if (!req.headers['HTTP_HMAC']) {
    errorAndDie('No HMAC signature sent.')
    return callback(null, null)
  }

  if (!req.body) {
    errorAndDie('Error reading POST data')
    return callback(null, null)
  }

  if (req.body.merchant !== merchantID) {
    errorAndDie('No or incorrect Merchant ID passed', req)
    return callback(null, null)
  }

  var hmac = crypto
    .createHmac('sha512', ipnSecret)
    .update(req)
    .digest('hex')
  if (req.headers['HTTP_HMAC'] === hmac) {
    log.error(
      `req.headers.HTTP_HMAC: '${
        req.headers['HTTP_HMAC']
      }'\nsecret_hmac: ${hmac}`
    )
    errorAndDie('HMAC signature does not match')
    return callback(null, null)
  }

  // HMAC Signature verified at this point, load some variables.
  const request = {
    txnId: req.body['txn_id'],
    itemName: req.body['item_name'],
    itemNumber: req.body['item_number'],
    amount1: parseFloat(req.body['amount1']),
    amount2: parseFloat(req.body['amount2']),
    currency1: req.body['currency1'],
    currency2: req.body['currency2'],
    status: parseInt(req.body['status']),
    statusText: req.body['status_text'],
    email: req.body['email'],
    name: req.body['name']
  }

  // depending on the API of your system, you may want to check and see if the transaction ID  txn_id has already been handled before at this point

  // Check the original currency to make sure the buyer didn't change it.
  if (request.currency1 !== orderCurrency) {
    errorAndDie('Original currency mismatch!')
    return callback(null, null)
  }

  // Check amount against order total
  if (request.amount1 < orderTotal) {
    errorAndDie('Amount is less than order total!')
    return callback(null, null)
  }

  if (request.status >= 100 || request.status === 2) {
    // payment is complete or queued for nightly payout, success
    log.info('PAYMENT RECEIVED!!! Wahooo')
    log.debug(`Attempting to activate user with email ${request.email}`)

    var newexpirationDate = moment()
    if (request.itemName === 'cftbt_unlimited') {
      newexpirationDate = moment().add(999, 'years')
    } else if (request.itemName === 'cftbt_monthly') {
      newexpirationDate = moment().add(1, 'month')
    } else return callback(null, null)

    User.findOneAndUpdate(
      { email: request.email },
      {
        set: {
          active: true,
          expirationDate: newexpirationDate
        }
      },
      {
        new: true
      },
      (err, user) => {
        log.verbose(`Updating database...`)
        if (!err && user) {
          return callback(null, user)
        } else {
          return callback(err)
        }
      }
    )
  } else if (request.status < 0) {
    // payment error, this is usually final but payments will sometimes be reopened if there was no exchange rate conversion or with seller consent
    log.info('PAYMENT ERROR :C')
    return callback(null, null)
  } else {
    // payment is pending, you can optionally add a note to the order page
    log.info('PAYMENT PENDING :)')
  }
  log.info('PAYMENT RECEIVED!!! Wahooo')
}

/**
 * Activate an existing user because payment was received
 * @function
 * @param {object} data
 * @param {callback} callback
 */
const activationXRP = (data, callback) => {
  log.log(
    `Attempting to activate account with destination tag  {
      data.transaction.DestinationTag
    }. Transaction hash:  {data.transaction.hash}`
  )
  if (data.validated) {
    const destinationTag = data.transaction.DestinationTag
    User.findOneAndUpdate(
      { destination_tag: destinationTag },
      {
        set: {
          active: true
        }
      },
      {
        new: true
      },
      (err, user) => {
        log.verbose(`Updating database...`)
        if (!err && user) {
          return callback(null, user)
        } else {
          return callback(err)
        }
      }
    )
  } else {
    log.warn(`Transaction  ${data.transaction.hash} was not validated`)
    return callback(null, null)
  }
}

module.exports = {
  activate,
  activationXRP
}
