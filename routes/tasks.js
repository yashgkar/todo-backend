const express = require('express');
const router = express.Router();
const {
    ensureAuthenticated
} = require('../config/auth');

const modelTask = require('../models/Task');
const Task = require('../api/newTask');
const saveNewTask = Task.saveNewTask;
const updateTask = Task.updateTask;

//tasks handle

router.get('/tasks', ensureAuthenticated, async (req, res) => {
    const tasks = await modelTask.find();
    res.json(tasks);
});


router.post('/tasks', ensureAuthenticated, (req, res) => {
    const {
        title,
        data,
        label
    } = req.body;
    const user = req.user._id;
    saveNewTask(res, user, title, data, label);
});

router.post('/tasks/update', ensureAuthenticated, (req, res) => {
    const taskid = req.params.id;
    const {
        title,
        data,
        label,
        status
    } = req.body;
    updateTask(res, taskid, title, data, status, label);
    console.log('Updated!');
});


module.exports = router;