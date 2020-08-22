'use strict'

const { getUser, getUserRepos } = require('./api-access/user')
const { getCommits } = require('./api-access/repos')

async function formatRepositoryCommits (repo, username) {
  const commits = await getCommits(repo.name, username)
  const filteredCommits = commits.filter((commit) => {
    if (commit.committer && commit.committer.login === username) {
      return true
    } else {
      return false
    }
  }).sort((commitA, commitB) => {
    return commitA.commit.author.date > commitB.commit.author.date
  })
  repo.commits = filteredCommits
  repo.numberOfCommits = filteredCommits.length
  if (repo.numberOfCommits > 0) {
    repo.lastCommitDate = filteredCommits[0].commit.author.date
  }
}

async function formatRepositories (repos, username) {
  const formattingPromises = []
  for (const repo of repos) {
    formattingPromises.push(formatRepositoryCommits(repo, username))
  }
  await Promise.all(formattingPromises)
  return repos
}

async function filterRepositoriesWithNoCommits (repos) {
  return repos.filter((repo) => {
    return repo.numberOfCommits > 0
  })
}

exports.getUserByUsername = async (username) => {
  try {
    const user = await getUser(username)
    let repos = await getUserRepos(username)
    repos = await formatRepositories(repos, username)
    repos = await filterRepositoriesWithNoCommits(repos)
    user.publicRepos = repos
    return user
  } catch (e) {
    if (e.status === 404) {
      return 'Not found'
    } else {
      console.log('Uh oh! Something went wrong. Try again.')
      process.exit(-1)
    }
  }
}
