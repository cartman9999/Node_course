const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('Async operation 1')
        resolve(1)
        // reject(new Error('Falla'))
    }, 2000)
})

const p2 = new Promise((resolve) => {
    setTimeout(() => {
        console.log('Async operation 2')
        resolve(2)
    }, 1000)
})

// Simulates parallel processing
Promise.all([p1, p2])
    .then((data) => {
        console.log("Data: ", data)
    })
    .catch((err) => {
        console.error(err)
    })

// Promise will consider donde when the first asyncronus operation finishes
// Promise.race([p1, p2])
//     .then((data) => {
//         console.log("Data: ", data)
//     })
//     .catch((err) => {
//         console.error(err)
//     })