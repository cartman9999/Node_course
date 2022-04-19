const {User} = require('../../../models/user')
const auth = require('../../../middleware/auth')
const mongoose = require('mongoose')

describe('Unit - auth middleware', () => {
    it('should populate req.user with the payload of the valid JWT', async () => {
        
        const user = {_id: mongoose.Types.ObjectId(), isAdmin: true }
        const token = await new User().generateAuthToken()
        const req = {
            header: jest.fn().mockReturnValue(token)
        }
        const res = {}
        const next = jest.fn()

        auth(req, res, next)

        expect(req.user).toBeDefined()
    })
})