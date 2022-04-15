const mongoose = require('mongoose')

// Define connection to MongoDB
mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => {
        console.error("Could not connect to MongoDB...", err)
    })

// Creating Schemas
// The different types are:
// String, Number, Date, Buffer, Boolean, ObjectID, Array
const courseSchema = new mongoose.Schema({
    _id: String,
    name: { 
        type: String, 
        required: true,
        minlength: 5,
        maxlength: 255,
        // match: /pattern/ This built-in validator expects a regular expresion
    },
    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network'], // enum is used to define a set o specific values
        lowercase: true, // Transforms the value into lowercase
        // uppercase: true, // Transforms the value into lowercase
        trim: true // Removes spaces from the begining or the end
    },
    author: String,
    // BEFORE => tags: [String]
    tags: {
        type: Array,
        // Creating a Validation: Required at least one value in the array
        // validate: {
        //     validator: function(value) {
        //         // Verify that value is set and length is greater than 0
        //         return value && value.length > 0
        //     },
        //     message: 'A course should have at least one tag.'
        // }

        // Creating the same validator but async
        validate: {
            isAsync: true,
            validator: async function(value) {
                return await myCustomAsyncValidation(value)
            },
            message: 'Async Validation: A course should have at least one tag.'
        }
    },
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    // Prices is required if isPublished is true (NOTE to do this we can´t use arrow function because "this" inside and arrow functions works just internally)
    price: { 
        type: Number, 
        required: function() { return this.isPublished },
        min: 10,
        max: 200,
        get: (v) => Math.round(v), // Applies Math.round to value when reading data from MongoDB
        set: v => Math.round(v) // Applies Math.round to value before storing
    }
})

// Async Custom Validation
async function myCustomAsyncValidation (value) {
    // console.log("Llega este value: ", value)
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(value && value.length > 0);
          }, 2000);
    })
}

// Creating a Model class
const Course = mongoose.model('Course', courseSchema)

// Create an async function to insert data into DB
async function createCourse() {
    // Creating an instance of the model class
    const course = new Course({
        _id: mongoose.Types.ObjectId(),
        name: 'GGplot',
        author: "Mosh",
        tags: ['backend', 'frontend'],
        // tags: [],
        isPublished: true,
        price: 17.9,
        category: 'WEB'
    })

    // Store data into DB
    try {
        // This methods validates that the data meets model requirments
        await course.validate()
        const result = await course.save()
        console.log(result)
    } catch (err) {
        // for-in is used to iterate over the keys
        for (field in err.errors) {
            console.error(`${field}: ${err.errors[field].message}`)
        }
    }
}

async function getCourses() {
    // Comparison Query Operators:
    // eq (equal)
    // ne (not equal)
    // gt (greater than)
    // gte (greater than or equal to)
    // lt (less than)
    // lte (less than or equal to)
    // in
    // nin (not in)

    // Logical Query Operators
    // or
    // and

    try {
        // Variables for pagination example:
        const pageNumber = 2
        const pageSize = 10

        // const courses = await Course.find({author: 'Mosh', isPublished: true})
        // Other examples
        const courses = await Course.find({author: 'Mosh', isPublished: true})
        
        // Pagination example
        // .skip((pageNumber - 1) * pageSize)
        // .limit(pageSize)
        // END Pagination example

        .limit(10)
        .sort({name: 1})
        .select({name:1, tags: 1})
        
        // Return the count of documents that match the criteria
        //.count()

        // 

        // Example, greater than 10 or less or equal to 20
        // .find({price: { $gt: 10, $lte: 20}})

        // Example, values are in 10, 15, 20
        // .find({price: { $in: [10, 15, 20]}})

        // Example, OR to get
        // .find()
        // .or([{author: 'Mosh}, {isPublished: true}])

        // Example, AND to get
        // .find()
        // .and([{author: 'Mosh}, {isPublished: true}])

        // Example REGEX, courses that authors starts with Mosh
        // .find({ author: /^Mosh/})

        // Example REGEX, courses that authors ends with Hamedani
        // .find({ author: /Hamedani$/})

        // Example RegEx, courses that authors ends with Hamedani
        // REGEX are case sensitive so in order to do a case insensitive search we need to add i
        // at the end of the RegEx
        // .find({ author: /Hamedani$/i})

        // Example REGEX, courses that authors contains Mosh
        // .* is a wildcard
        // .find({ author: /.*Mosh.*/i})

        console.log(courses)
    } catch (error) {
        console.error(error)
    }
}

// Update a document
async function updateCourse(id) {
    // First approach: Query first
    // findById()
    // Modify its properties
    // save()

    const course = await Course.findById(id)
    if (!course) return;
    
    // Update every attribute
    // course.isPublished = true
    // course.author = "Another author2"

    // Updating using set method
    course.set({
        isPublished: true,
        author: "Another author2"
    })
    
    const result = await course.save()
    console.log(result)


    // Second approach: Update first
    // Update directly
    // Optionally: get the updated document
    // const course = await Course.findByIdAndUpdate(id, {
    //     $set: {
    //         author: 'Mosh3',
    //         isPublished: false
    //     }
    // }, {new: true})
    // console.log(course)
}

// Delete a document
async function deleteCourse(id) {
    // First approach: Query first
    const course = await Course.deleteOne({_id: id})
    console.log(course)


    // Second approach: Update first
    // Update directly
    // Optionally: get the updated document
    // const course = await Course.findByIdAndUpdate(id, {
    //     $set: {
    //         author: 'Mosh3',
    //         isPublished: false
    //     }
    // }, {new: true})
    // console.log(course)
}

// Insert data into DB
createCourse()

// Retrieve all courses from DB
// getCourses()

// Update
// updateCourse("5a6900fff467be65019a9001")

// Delete
// deleteCourse("5a6900fff467be65019a9001")