// Get all the published that are 15 or more
// or have the word 'by' in ther title
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
    return await Course.find({isPublished: true})
                            .or([
                                    {price: {$gte: 15}},
                                    {name: /.*by.*/i}
                                ])
                            .select('name author price')

}

async function run() {
    const courses = await getCourses()
    console.log(courses)
}

run()