'use strict'

const organization = require('../lib/organization')
const { expect } = require('chai')
const { describe, it } = require('mocha')

describe('Organization lookup', () => {
  it('Returns information about a GitHub organization', async () => {
    const byuOit = await organization.getOrganizationByOrgName('byu-oit')
    expect(byuOit).to.contain.key('publicMembers')
    for (const member in byuOit.publicMembers) {
      expect(member).to.contain.keys('username', 'realName', 'emailAddress')
    }
  })
})
