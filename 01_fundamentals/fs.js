const fs = require('fs')

const files = fs.readdirSync('./')

const filesAsyncCallback = fs.readdir('./', (err, files) => {
    return (err) 
        ? console.error(err)
        : console.log(`Async Callback: ${files}`)

})

console.log(files)
// console.log(filesAsyncCallback)