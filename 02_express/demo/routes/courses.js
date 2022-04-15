const express = require('express')
const router = express.Router()
const Joi = require('joi')

const courses = [
    {
        id: 1,
        name: 'course1'
    },
    {
        id: 2,
        name: 'course2'
    },
    {
        id: 3,
        name: 'course3'
    },
]

router.get('/', (req, res) => {
    res.send(courses)
})

router.get('/:id', (req, res) => {
    // req.params -> Used to read data required in route
    // req.query -> Used to read additional paramets sent as query parameters in the route
    // req.body -> Used to read data that travel through the request body

    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) return res.status(404).send('The course with the given ID was not found.')

    res.send(course)
})

router.post('/', (req, res) => {
    // Validate
    const { error } = validateCourse(req.body)

    // If error
    if (error) return res.status(400).send(error.details[0].message)
    
    // Create new course
    const course = {
        id: courses.length + 1,
        name: req.body.name
    }

    // Add new course to courses object array
    courses.push(course)

    res.status(201).send(course)

})

router.put('/:id', (req, res) => {
    // Verify that given id exists
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) return res.status(404).send('The course with the given ID was not found.')

    // Validate
    // const result = validateCourse(req.body)
    // Using destructuring
    const { error } = validateCourse(req.body)

    // If error
    if (error) return res.status(400).send(error.details[0].message)

    // Update course
    course.name = req.body.name

    res.send(course)
})

router.delete('/:id', (req, res) => {
    // Verify that given id exists
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) return res.status(404).send('The course with the given ID was not found.')

    // Validate
    const { error } = validateCourse(req.body)

    // If error
    if (error) return res.status(400).send(error.details[0].message)

    // Get the index of the object inside the array of courses
    const index = courses.indexOf(course)

    // Remove from index
    courses.splice(index, 1)

    res.send(course)
})

function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })

    return schema.validate(course)
}

module.exports = router