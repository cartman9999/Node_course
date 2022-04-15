const exercise1 = require('../exercise1')

describe('Fizzbuzz', () => {
    it('should throw an exception if input is not a number', () => {
        expect(() => exercise1.fizzBuzz('hola')).toThrow()
        expect(() => exercise1.fizzBuzz(null)).toThrow()
    })

    it('should return FizzBuzz if divisible by 3 and 5', () => {
        const result = exercise1.fizzBuzz(15)
        expect(result).toBe('FizzBuzz')
    })

    it('should return Fizz if divisible by 3', () => {
        const result = exercise1.fizzBuzz(6)
        expect(result).toBe('Fizz')
    })

    it('should return Buzz if divisible by 5', () => {
        const result = exercise1.fizzBuzz(10)
        expect(result).toBe('Buzz')
    })

    it('should return input if not divisible by 3 or 5', () => {
        const result = exercise1.fizzBuzz(1)
        expect(result).toBe(1)
    })
})