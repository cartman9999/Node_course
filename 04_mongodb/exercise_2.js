// Get all the published frontend and backend courses
// sort them by their price in a descending order,
// pick only their name and author
// and display them
const mongoose = require('mongoose')

const db = 'mongo-exercises'

// Create connection
mongoose.connect(`mongodb://localhost/${db}`)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => {
        console.error("Could not connect to MongoDB...", err)
    })

// Create Schema
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: Number
})

// Creating a Model class
const Course = mongoose.model('Course', courseSchema)

async function getCourses() {
    return await Course.find({isPublished: true, tags: {$in: ['backend', 'frontend']}})
                            .sort({price: -1})
                            // .sort('-price') // Is valid to pass a string with a minus
                            .select({name:1, author: 1})

}

async function run() {
    const courses = await getCourses()
    console.log(courses)
}

run()