"use strict";
const crypto = require("crypto");
const moment = require("moment");
const config = require("../../config").config;
const User = require("../user.model");
const log = require("../../config/services/logging");
const mail = require("../../common/services/email");

moment().format();

const debugEmail = "confettibotmx@gmail.com";
const merchantID = config.coinPaymentsMerchantID;
const ipnSecret = config.coinPaymentsIPNSecret;
const orderCurrency = "MXN";
var orderTotalMonthly = 179.0;
var orderTotalUnlimited = 499.0;

function errorAndDie(errorMsg, req = null) {
  let reqstring = JSON.stringify({ headers: req.headers, body: req.body });
  mail.send(
    {
      to: debugEmail,
      subject: "CoinPayments IPN Error",
      content: `Error: ${errorMsg}<br /><br />Request:<br /><br />${reqstring}`
    },
    (error, sent) => {
      if (!error && sent) {
      } else {
      }
    }
  );
  log.error("IPN Error: " + errorMsg);
}

/**
 * Activate an existing user
 * @function
 * @param {object} req
 * @param {callback} callback
 */
const activate = (req, callback) => {
  if (req.body.ipn_mode !== "hmac") {
    errorAndDie("IPN Mode is not HMAC", req);
    return callback(null, null);
  }

  if (!req.headers.hmac) {
    errorAndDie("No HMAC signature sent.", req);
    return callback(null, null);
  }

  if (!req.body) {
    errorAndDie("Error reading POST data", req);
    return callback(null, null);
  }
  if (req.body.merchant !== merchantID) {
    errorAndDie("No or incorrect Merchant ID passed", req);
    return callback(null, null);
  }

  const bodyString = Buffer.from(req.rawBody, "utf8");
  let hmac = crypto
    .createHmac("sha512", ipnSecret)
    .update(bodyString)
    .digest("hex");
  if (req.headers.hmac !== hmac) {
    errorAndDie("HMAC signature does not match", req);
    return callback(null, null);
  }

  // HMAC Signature verified at this point, load some variables.
  const request = {
    txnId: req.body.txn_id,
    itemName: req.body.item_name,
    itemNumber: req.body.item_number,
    amount1: parseFloat(req.body.amount1),
    amount2: parseFloat(req.body.amount2),
    currency1: req.body.currency1,
    currency2: req.body.currency2,
    status: parseInt(req.body.status),
    statusText: req.body.status_text,
    email: req.body.email,
    name: req.body.name
  };

  // depending on the API of your system, you may want to check and see if the transaction ID  txn_id has already been handled before at this point

  // Check the original currency to make sure the buyer didn't change it.
  if (request.currency1 !== orderCurrency) {
    errorAndDie("Original currency mismatch!");
    return callback(null, null);
  }

  // Check amount against order total
  if (request.itemNumber === "cftbt_monthly") {
    if (request.amount1 < orderTotalMonthly) {
      errorAndDie("Amount is less than order total!");
      return callback(null, null);
    }
  } else if (request.itemNumber === "cftbt_unlimited") {
    if (request.amount1 < orderTotalUnlimited) {
      errorAndDie("Amount is less than order total!");
      return callback(null, null);
    }
  }

  if (request.status >= 100 || request.status === 2) {
    // payment is complete or queued for nightly payout, success
    log.info("PAYMENT RECEIVED AND CONFIRMED!!! Wahooo");
    log.info(`Attempting to activate user with email ${request.email}`);

    var newexpirationDate = moment();
    if (request.itemNumber === "cftbt_unlimited") {
      log.info("cftbt_unlimited matched");
      newexpirationDate = moment().add(999, "years");
    } else if (request.itemNumber === "cftbt_monthly") {
      log.info("cftbt_monthly matched");
      newexpirationDate = moment().add(1, "month");
    } else {
      errorAndDie("itemNumber does match any known item", req);
      return callback(null, null);
    }
    log.info(newexpirationDate().format());
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
        if (!err && user) {
          log.info("DB update success");
          return callback(null, user);
        } else {
          log.error("DB update error" + err);
          return callback(err);
        }
      }
    );
  } else if (request.status < 0) {
    // payment error, this is usually final but payments will sometimes be reopened if there was no exchange rate conversion or with seller consent
    log.info("PAYMENT ERROR :C");
    return callback(null, null);
  } else {
    // payment is pending, you can optionally add a note to the order page
    log.info("PAYMENT PENDING :)");
  }
};

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
  );
  if (data.validated) {
    const destinationTag = data.transaction.DestinationTag;
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
        log.verbose(`Updating database...`);
        if (!err && user) {
          return callback(null, user);
        } else {
          return callback(err);
        }
      }
    );
  } else {
    log.warn(`Transaction  ${data.transaction.hash} was not validated`);
    return callback(null, null);
  }
};

module.exports = {
  activate,
  activationXRP
};
