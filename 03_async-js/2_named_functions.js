// This strategy is used to avoid callback hell

console.log('Before')
getUser(1, getRepositories)
console.log('After')

function getUser(id, callback) {
    setTimeout(() => {
        console.log('Reading user from DB')

        callback({id: id, gitHubUserName: 'cartman9999'})
    }, 2000)
}

function getRepositories(username, callback) {
    setTimeout(() => {
        console.log('Getting repositories from GitHub')

        callback(['repo1', 'repo2', 'repo3'])
    }, 2000)
}

// New named functions
function displayCommits(commits) {
    console.log(commits)
}

function getCommits(repositories) {
    console.log(`Repositories: ${repositories}`)
    // getCommits(repo, displayCommits)
}

function getRepositories(user) {
    console.log("User:")
    console.log(user)

    getRepositories(user.gitHubUserName, getCommits)
}