const request = require('supertest')
const mongoose = require('mongoose')
const { Genre } = require('../models/genre')
const { User } = require('../models/user')
let server

describe('/api/genres', () => {
    beforeEach(async() => { 
        // Launch server for testing purposes
        server = require('../index') 
    })

    afterEach(async () => { 
        // Remove Genres for next tests
        await Genre.remove({})
        
        // Close the server connection
        server.close() 
    })

    describe('GET /', () => {
        it('should return all genres', async () => {
            // Create a fake insertion
            await Genre.collection.insertMany([
                {name: 'genre1'},
                {name: 'genre2'},
                {name: 'genre3'}
            ])
            
            const res = await request(server).get('/api/genres')
            expect(res.status).toBe(200)
            expect(res.body.length).toBe(3)
            expect(res.body.some(g => g.name === "genre1")).toBeTruthy()
            expect(res.body.some(g => g.name === "genre2")).toBeTruthy()
            expect(res.body.some(g => g.name === "genre3")).toBeTruthy()
        })
    })

    describe('GET /:id', () => {
        it('should return a specific genre', async () => {
            // Create a payload
            const payload = {
                                _id: new mongoose.Types.ObjectId().toHexString(),
                                name: "genre1.2"
                            }
            
            // Create a fake insertion
            await Genre.collection.insertOne(payload)
            
            const res = await request(server).get(`/api/genres/${payload._id}`)
            expect(res.status).toBe(200)
            
        })

        it('should fail to return a specific genre', async () => {
            const test_id = "1234"
            
            const res = await request(server).get(`/api/genres/${test_id}`)
            expect(res.status).toBe(404)
            // expect(res.body.length).toBe(3)
        })
    })

    describe('POST /', () => {
        it('should return a 401 if client is not logged in', async () => {
            const res = await request(server).post('/api/genres').send({ name: 'genre1'})
            expect(res.status).toBe(401)
        })

        it('should return a 400 if genre length is less than 5 characters', async () => {
            // Simulate user, to pass auth validation
            const token = new User().generateAuthToken()
            
            // Simulate user, to pass auth validation
            const res = await request(server)
                                .post('/api/genres')
                                .set('x-auth-token', token)
                                .send({ name: 'gen'})
            expect(res.status).toBe(400)
        })

        it('should return a 400 if genre length is greater than 50 characters', async () => {
            // Simulate user, to pass auth validation
            const token = new User().generateAuthToken()

            // Create a name with more than 50 characters for test
            const name = new Array(52).join('a')

            const res = await request(server)
                                .post('/api/genres')
                                .set('x-auth-token', token)
                                .send({ name })
            expect(res.status).toBe(400)
        })

        it('should save the genre if it is valid', async () => {
            const token = new User().generateAuthToken()
            const res = await request(server)
                                .post('/api/genres')
                                .set('x-auth-token', token)
                                .send({ name: 'genre1' })
            
            const genre = await Genre.find({name: 'genre1'})
            
            expect(genre).not.toBeNull()
        })

        it('should return the genre if it is valid', async () => {
            // Simulate user, to pass auth validation
            const token = await new User().generateAuthToken()

            const res = await request(server)
                                .post('/api/genres')
                                .set('x-auth-token', token)
                                .send({ name: 'genre1' })
            
            expect(res.body).toHaveProperty('_id')
            expect(res.body).toHaveProperty('name', 'genre1')
        })
    })
})

///// Middleware Auth
describe('auth middleware', () => {
    beforeEach(async () => { 
        // Launch server for testing purposes
        server = require('../index') 
    })

    afterEach(async () => { 
        // Close the server connection
        server.close() 

        // Remove Genres for next tests
        await Genre.remove({})
    })

    it('should return a 401 if no token is provided', async () => {
        const res = await request(server)
                            .post('/api/genres')
                            .send({name: 'genre1'})

        expect(res.status).toBe(401)
    })

    it('should return a 400 if token is invalid', async () => {
        const token = ''
        const res = await request(server)
                            .post('/api/genres')
                            .set('x-auth-token', token)
                            .send({name: 'genre1'})

        expect(res.status).toBe(401)
    })

    it('should return a 201 if token is valid', async () => {
        const token = new User().generateAuthToken()
        const res = await request(server)
                            .post('/api/genres')
                            .set('x-auth-token', token)
                            .send({name: 'genre1'})

        expect(res.status).toBe(201)
    })
})