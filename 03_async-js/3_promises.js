// Promises
// Object that holds the eventual result of an asynchronous operation
const p = new Promise((resolve, reject) => {
    // If promise fulfilled then resolve
    setTimeout( () => {
        resolve(1)
    }, 2000)
    
    // If error then reject
    //reject(new Error('error message'))
})

p.then( (data) =>{
        console.log(data)
    })
    .catch( (err) => {
         console.error(err)
    })