// Get all the published backend courses
// sort them by their name,
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
    isPublished: Boolean
})

// Creating a Model class
const Course = mongoose.model('Course', courseSchema)

async function getCourses() {
    return await Course.find({isPublished: true, tags: 'backend'})
                            .sort({name: 1})
                            .select({name:1, author: 1})

}

async function run() {
    const courses = await getCourses()
    console.log(courses)
}

run()