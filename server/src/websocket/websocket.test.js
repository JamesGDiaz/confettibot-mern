'use strict'

process.env.NODE_ENV = 'test'

const expect = require('chai').expect
const { wssApp, wssAppServer } = require('./index')

describe('WebSocket', () => {
  it('should get wsApp object', () => {
    expect(wssApp).to.be.an('object')
  })
  it('should get wsAppServer object', () => {
    expect(wssAppServer).to.be.an('object')
  })
})
