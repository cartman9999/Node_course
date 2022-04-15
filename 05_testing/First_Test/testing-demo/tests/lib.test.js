const lib = require('../lib')
const db = require('../db')
const mail = require('../mail')

// First test
describe('Absolute', () => {
    it('should return a positive number if input is positive', () => {
        const result = lib.absolute(1)
        expect(result).toBe(1)
    })
    
    it('should return a positive number if input is negative', () => {
        const result = lib.absolute(-1)
        expect(result).toBe(1)
    })
    
    it('should return a zero if input is zero', () => {
        const result = lib.absolute(0)
        expect(result).toBe(0)
    })
})

// Testing strings
describe('Greet', () => {
    it('should return the greeting message', () => {
        const result = lib.greet('Eric')
        
        // Using regex
        expect(result).toMatch(/Eric/)

        // Check if response contains the name
        expect(result).toContain('Eric')
    })
})

// Testing arrays
describe('getCurrencies', () => {
    it('should return supported currencies', () => {
        const result = lib.getCurrencies()
        
        // proper way but not the nicest
        // expect(result).toContain('USD')
        // expect(result).toContain('AUD')
        // expect(result).toContain('EUR')

        // Ideal way
        expect(result).toEqual(expect.arrayContaining(['EUR', 'USD', 'AUD']))
    })
})

// Testing objects
describe('getProduct', () => {
    it('should return the product with the given id', () => {
        const result = lib.getProduct(1)

        // toEqual looks for the exact properties in the object
        // expect(result).toEqual({
        //     id: 1,
        //     price: 10
        // })

        // toMatchObject looks that the object contains the properties requested eventhough it could have more properties
        expect(result).toMatchObject({
            id: 1,
            price: 10
        })

        // toHaveProperty verfies that object contains the property with the same data type value
        expect(result).toHaveProperty('id', 1)
    })
})

// Testing Exceptions
describe('registerUser', () => {
    it('should throw if username is falsy', () => {
        // Define an array with the possible falsy values
        const args = [null, undefined, NaN, '', 0, false]

        args.forEach( a => {
            // Testing Exceptions doesn´t requieres a result, so we call the callback
            expect(() => { lib.registerUser(a) }).toThrow()
        })
    })

    it('should return a user object if valid username is passed', () => {
        const result = lib.registerUser('eric')
        expect(result).toMatchObject({ username: 'eric'})
        expect(result.id).toBeGreaterThan(0)
    })
})

// Mock functions
describe('applyDiscount', () => {
    it('should apply 10% if customer has more than 10 points', () => {
        // Mocking the getCustomerSync implementation
        db.getCustomerSync = function (customerId) {
            console.log('Fake reading customer')
            return { id: customerId, points: 20 }
        }


        const order = { customerId: 1, totalPrice: 10}
        lib.applyDiscount(order)
        expect(order.totalPrice).toBe(9)
    })
})


describe('notifyCustomer', () => {
    it('should send an email to the customer', () => {
        // old implementation
        // db.getCustomerSync = function (customerId) {
        //     return { email: 'a'}
        // }

        // New implementation
        db.getCustomerSync = jest.fn().mockReturnValue({ email: 'a'})

        // Old implementation
        // let mailSent = false
        // mail.send = function(email, message) {
        //     console.log('Fake sending email')
        //     mailSent = true
        // }

        // New implementation
        mail.send = jest.fn()

        // Old implementation
        // lib.notifyCustomer({ customerId: 1 })
        // expect(mailSent).toBe(true)

        // New implementation
        lib.notifyCustomer({ customerId: 1 })
        
        expect(mail.send).toHaveBeenCalled()

        // Check arguments passed when the function was called
        expect(mail.send.mock.calls[0][0]).toBe('a')
        expect(mail.send.mock.calls[0][1]).toMatch(/order/)
    })
})