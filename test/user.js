'use strict'

const user = require('../lib/user')
const { expect } = require('chai')
const { describe, it } = require('mocha')

describe('User', () => {
  it('Returns information about a GitHub user', async () => {
    const sethwbarton = await user.getUserByUsername('sethwbarton')
    expect(sethwbarton).to.contain.key('publicRepos')
    for (const repo of sethwbarton.publicRepos) {
      expect(repo).to.contain.keys('name', 'numberOfCommits', 'lastCommitDate')
    }
  })

  it('Returns the correct number of commits by the user for each repo', async () => {
    const sethwbarton = await user.getUserByUsername('sethwbarton')
    expect(sethwbarton).to.contain.key('publicRepos')
    for (const repo of sethwbarton.publicRepos) {
      if (repo.name === 'central_cinema') {
        expect(repo.numberOfCommits).to.equal(10)
      }
    }
  })
})
