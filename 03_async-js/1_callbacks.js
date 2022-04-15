console.log('Before')
getUser(1, (user) => {
    console.log("User:")
    console.log(user)

    getRepositories(user.gitHubUserName, (repositories) => {
        console.log(`Repositories: ${repositories}`)
    })
})
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