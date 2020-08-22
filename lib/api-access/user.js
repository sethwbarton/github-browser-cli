'use strict'
const { Octokit } = require('@octokit/core')

exports.getUser = async (username) => {
  const { apiKey } = require('../../index')
  const octokit = new Octokit({
    auth: apiKey
  })
  const { data } = await octokit.request('GET /users/' + username)
  return data
}

exports.getUserRepos = async (username) => {
  const { apiKey } = require('../../index')
  const octokit = new Octokit({
    auth: apiKey
  })
  const { data } = await octokit.request('GET /users/' + username + '/repos')
  return data
}
