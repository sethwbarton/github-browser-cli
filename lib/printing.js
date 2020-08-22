'use strict'

const TableMaker = require('cli-table')

exports.printUserRepos = function (publicRepos) {
  const table = new TableMaker({
    head: ['Repo Name', 'Number of Commits', 'Last Committed Date'],
    colWidths: [50, 50, 50]
  })
  for (const repo of publicRepos) {
    table.push(
      [repo.name, repo.numberOfCommits, repo.lastCommitDate]
    )
  }
  console.log(table.toString())
}

exports.printOrganizationMembers = function (organizationMembers) {
  const table = new TableMaker({
    head: ['Username', 'Real Name', 'Email'],
    colWidth: [20, 20, 20]
  })
  for (const member of organizationMembers) {
    table.push(
      [member.login, member.name, member.email ? member.email : 'N/A']
    )
  }
  console.log(table.toString())
}
