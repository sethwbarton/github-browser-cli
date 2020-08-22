'use strict'
const { Octokit } = require('@octokit/core')

exports.getOrganization = async (organizationName) => {
  const { apiKey } = require('../../index')
  const octokit = new Octokit({
    auth: apiKey
  })
  const { data } = await octokit.request('GET /orgs/' + organizationName)
  return data
}

exports.getOrganizationMembers = async (organizationName) => {
  const { apiKey } = require('../../index')
  const octokit = new Octokit({
    auth: apiKey
  })
  const { data } = await octokit.request('GET /orgs/' + organizationName + '/public_members')
  return data
}
