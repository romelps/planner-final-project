const Task = require('../models/task.js');

const express = require('express');
const router = express.Router();

router.post('/', async (req,res) => {
    try{
        const createdTask = await Task.create(req.body);
        res.status(201).json(createdTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try{
        const foundTasks = await Task.find({});
        res.status(200).json(foundTasks);
        // res.json({ message: 'Index Route'});
    } catch {
        res.status(500).json({ error: error.message });
    }
})

router.get('/:taskId', async (req,res) => {
    try {
        const foundTask = await Task.findById(req.params.taskId);
        if(!foundTask){
            res.status(404);
            throw new Error('Task not found.')
        }
        res.status(200).json(foundTask);
    } catch (error) {
        if (res.statusCode === 404) {
           res.json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
});

router.delete('/:taskId', async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.taskId);
        res.status(200).json(deletedTask)
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
})

router.put('/:taskId', async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.taskId, req.body, {
            new: true, //gives us the updated resource
        });
        //checking for a not found task
        if (!updatedTask) {
            res.status(404);
            throw new Error('Task not found.');
        }
        //response of updated pet
        res.status(200).json(updatedTask);
    } catch (error){
        if (res.statusCode === 404) {
            res.json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
});

module.exports = router;