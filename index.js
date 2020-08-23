'use strict'

const userLookUp = require('./lib/user')
const orgLookUp = require('./lib/organization')
const printer = require('./lib/printing')

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

const startPrompt = function () {
  readline.question('What would you like to look up? \n 1. Look up an organization \n 2. Look up a user \n 3. Exit \n > ',
    (choice) => {
      if (choice === '1') {
        lookUpOrganization()
      } else if (choice === '2') {
        lookUpUser()
      } else if (choice === '3') {
        process.exit(0)
      } else {
        console.log('Invalid choice, try again')
        startPrompt()
      }
    })
}

function lookUpUser () {
  readline.question('Please give the username you\'d like to look up: \n > ',
    async (username) => {
      const user = await userLookUp.getUserByUsername(username)
      if (user === 'Not found') {
        console.log("Sorry, that user doesn't exist!")
        startPrompt()
      } else {
        printer.printUserRepos(user.publicRepos)
        startPrompt()
      }
    })
}

function lookUpOrganization () {
  readline.question('Please give the name of the organization you\'d like to look up: \n > ',
    async (orgName) => {
      const organization = await orgLookUp.getOrganizationByOrgName(orgName)
      if (organization === 'Not found') {
        console.log("Sorry, that organization doesn't exist!")
        startPrompt()
      } else {
        printer.printOrganizationMembers(organization.publicMembers)
        startPrompt()
      }
    })
}

async function main (argv) {
  if (!argv[2]) {
    console.log('Please provide a GitHub access token.')
    process.exit(0)
  }
  exports.apiKey = argv[2]
  startPrompt()
}

main(process.argv)
