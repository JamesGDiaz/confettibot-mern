'use strict'

const mongoose = require('mongoose')
const { Schema } = mongoose

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
    minlength: 5,
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
  activation: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1000
  },
  admin: {
    type: Boolean,
    default: false
  },
  destination_tag: {
    type: Number,
    required: true,
    length: 8
  },
  recovery: {
    type: String,
    default: ''
  }
})

/**
 * Create a model using user schema
 */
module.exports = mongoose.model('User', userSchema)
