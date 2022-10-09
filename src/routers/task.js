const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const Task = require('../models/task')

router.get('/tasks', auth, async (req, res) => {
    try {
        // const tasks = await Task.find({owner: req.user._id})
        await req.user.populate('tasks')

        // res.send(tasks)
        res.send(req.user.tasks)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findOne({_id, owner: req.user._id})

        if(!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.patch('/tasks/:id', auth, async (req, res) => {
    const allowedUpdates = ['description', 'completed']
    const updates = Object.keys(req.body)
    const isValid = updates.every(update => allowedUpdates.includes(update))

    if(!isValid) {
        return res.status(400).send({ error: 'Invalid updates'})
    }

    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user.id })
        
        if(!task) {
            return res.status(404).send()
        }
       
        updates.forEach(update => task[update] = req.body[update])
        await task.save()
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id', auth, async(req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

        if(!task) {
            return res.status(404).send()
        }
        return res.send(task )
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})

module.exports = router