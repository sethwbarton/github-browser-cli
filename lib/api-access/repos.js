'use strict'
const { Octokit } = require('@octokit/core')

exports.getCommits = async (repoName, username) => {
  const { apiKey } = require('../../index')
  const octokit = new Octokit({
    auth: apiKey
  })
  const { data } = await octokit.request('GET /repos/' + username + '/' + repoName + '/commits')
  return data
}
