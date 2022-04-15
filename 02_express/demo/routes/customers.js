const express = require('express')
const router = express.Router()
const { Customer, validate} = require('../models/customer')
const auth = require('../middleware/auth')


router.get('/', auth, async(req, res) => {
    try {
        const customers = await Customer.find({})
        
        return res.status(200).send(customers)
    } catch (err) {
        console.err(err.message)
        return res.status(500).send("Ocurrió un error al obtener los clientes.")
    }
})

router.post('/', auth, async(req, res) => {
    // Validate
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    try {
        const costumer = new Customer({
            name: req.body.name,
            phone: req.body.phone,
            isGold: req.body.isGold
        })

        await costumer.save()

        return res.status(201).send(costumer)
        
    } catch (err) {
        console.error(err.message)
        return res.status(500).send("Ocurrió un error al guardar el cliente")
    }
})

router.put('/:id', auth, async(req, res) => {
    // Validate
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    try {
        const { name, phone, isGold } = req.body
        const dataToUpdate = { name, phone, isGold }

        const costumer = await Customer.findByIdAndUpdate(req.params.id, dataToUpdate, {new: true})
        if (!costumer) return res.status(404).send('The costumer with the given id wasn´t found.')

        return res.status(200).send(costumer)
        
    } catch (err) {
        console.error(err.message)
        return res.status(500).send("An error occured while updating the costumer.")
    }    
})

router.delete('/:id', auth, async(req, res) => {
    const { id } = req.params

    try {
        const costumer = await Customer.findByIdAndRemove(id)
        
        return res.status(202).send("Customer succesfuly deleted")
    } catch (err) {
        console.error(err.message)
        return res.status(500).send("An error occured while deleting the costumer.")
    }
})

module.exports = router