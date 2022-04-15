// To simulate promises that are resolved or rejected,
// very useful for unit test

// Promises that are already resolved
const p = Promise.resolve({
    id:1
})

p.then( result => console.log(result) )

// Promises that are already rejected
const p2 = Promise.reject(new Error('Reason for rejection...'))

p2.catch( err => console.log(err) )