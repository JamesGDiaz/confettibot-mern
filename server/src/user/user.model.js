'use strict'

const mongoose = require('mongoose')
require('mongoose-moment')(mongoose)
const { Schema } = mongoose
const moment = require('moment')

/**
 * Create user schema
 */
const userSchema = new Schema({
  id: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1000
  },
  username: {
    type: String,
    required: false,
    minlength: 5,
    maxlength: 100
  },
  name: {
    type: String,
    required: false,
    minlength: 1,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 100
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1000
  },
  salt: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  active: {
    type: Boolean,
    default: false
  },
  recovery: {
    type: String,
    default: ''
  },
  expirationDate: {
    type: 'Moment',
    required: true,
    default: moment.unix(0)
  },
  registerDate: {
    type: 'Moment',
    required: true,
    default: moment()
  },
  txIDArray: {
    type: Array,
    required: true,
    default: []
  }
})

/**
 * Create a model using user schema
 */
module.exports = mongoose.model('User', userSchema)
