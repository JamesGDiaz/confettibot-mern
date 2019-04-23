'use strict'

const User = require('../user.model')

/**
 * Remove user
 * @function
 * @param {object} data
 * @param {callback} callback
 */
const remove = (data, callback) => {
  const { id, email } = data
  User.deleteOne({ id, email }, err => {
    if (!err) {
      return callback(null)
    } else {
      return callback(err)
    }
  })
}

module.exports = {
  profileRemove: remove
}
