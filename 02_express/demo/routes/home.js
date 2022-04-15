const express = require('express')
const router = express.Router()

// app has the following methods:
// app.get()
// app.post()
// app.put()
// app.delete()

router.get('/', (req, res) => {
    res.render('index', {
        title: "My Express App",
        message: "Hello"
    })
})

module.exports = router