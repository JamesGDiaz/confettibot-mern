'use strict'

const express = require('express')
const home = require('../src/home')
const user = require('../src/user')
let router = express.Router()

router.get('*', home.index)
router.post('/api/activation', user.activation)

module.exports = router
