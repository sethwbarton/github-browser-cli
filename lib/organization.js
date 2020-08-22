'use strict'

const { getOrganization, getOrganizationMembers } = require('./api-access/organization')
const { getUser } = require('./api-access/user')

async function formatMemberDetails (member) {
  const memberDetails = await getUser(member.login)
  member.name = memberDetails.name
  member.email = memberDetails.email
}

exports.getPublicMembers = async (orgName) => {
  const orgMembers = await getOrganizationMembers(orgName)
  const memberFormatPromises = []
  for (const member of orgMembers) {
    memberFormatPromises.push(formatMemberDetails(member))
  }
  await Promise.all(memberFormatPromises)
  return orgMembers
}

exports.getOrganizationByOrgName = async (orgName) => {
  try {
    const organization = await getOrganization(orgName)
    organization.publicMembers = await exports.getPublicMembers(orgName)
    return organization
  } catch (e) {
    if (e.status === 404) {
      return 'Not found'
    } else {
      console.log('Uh oh! Something went wrong. Try again.')
      process.exit(-1)
    }
  }
}
