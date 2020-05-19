const express = require('express');
const router = express.Router();
const {
    ensureAuthenticated
} = require('../config/auth');

// const modelTask = require('../models/Task');
const Task = require('../api/newTask');
const saveNewTask = Task.saveNewTask;

//tasks handle

router.get('/tasks', ensureAuthenticated, (req, res) => {
    res.send('logged in');
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


module.exports = router;