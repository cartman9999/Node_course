console.log('Before');

// First approach
// getUser(1).then((user) => {
//         getRepositories(user.gitHubUsername).then((repos) => {
//             console.log("Repos ", repos)

//             getCommits(repos[0]).then((data) => {
//                 console.log(data)
//             })
//             .catch((err) => {
//                 console.err(err)
//             })
//         })
//         .catch((err) => {
//             console.log(err)
//         })
//     })
//     .catch((err) => {
//         console.error(err)
//     })

// Second approach and BEST approach
getUser(1).then( (user) => {
        return getRepositories(user.gitHubUsername)
    })
    .then( (repos) => {
       return getCommits(repos[0])
    })
    .then( (commits) => {
        console.log(commits)
    })
    .catch((err) => {
        console.error(err)
    })

console.log('After');

// Promises
function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Reading a user from a database...');
            resolve({ id: id, gitHubUsername: 'mosh' });
          }, 2000);
    })
}

function getRepositories(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Calling GitHub API...')
            resolve(['repo1', 'repo2', 'repo3'])
        }, 6000);
    })
}

function getCommits(repo) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Calling GitHub API...')
            resolve(['commit'])
        }, 2000);
    })
}