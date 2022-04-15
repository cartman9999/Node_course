console.log('Before');
displayCommits()
console.log('After');

// Promise-based approach
// getUser(1).then( (user) => {
//         return getRepositories(user.gitHubUsername)
//     })
//     .then( (repos) => {
//        return getCommits(repos[0])
//     })
//     .then( (commits) => {
//         console.log(commits)
//     })
//     .catch((err) => {
//         console.error(err)
//     })

// Async and await approach
// IMPORTANT TO USE AWAIT IT SHOULD BE USED INSIDE AN ASYNC FUNCTION
async function displayCommits() {
    // To catch errors while using async-await its necessary to place asynchronous code in a try-catch block
    try {
        const user = await getUser(1)
        const repositories = await getRepositories(user.gitHubUsername)
        const commits = await getCommits(repositories[0])
        console.log(commits)
    } catch (err) {
        console.error(err)
    }
}


// Promises
async function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Reading a user from a database...');
            resolve({ id: id, gitHubUsername: 'mosh' });
          }, 2000);
    })
}

async function getRepositories(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Calling GitHub API...')
            // resolve(['repo1', 'repo2', 'repo3'])
            reject(new Error('Prueba de catch'))
        }, 6000);
    })
}

async function getCommits(repo) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Calling GitHub API...')
            resolve(['commit'])
        }, 2000);
    })
}