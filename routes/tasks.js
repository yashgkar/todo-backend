const express = require('express');
const router = express.Router();
const {
    ensureAuthenticated
} = require('../config/auth');

const modelTask = require('../models/Task');
const Label = require('../models/Label');
const Status = require('../models/Status');

const Task = require('../controller/newTask');
const saveNewTask = Task.saveNewTask;
const updateTask = Task.updateTask;
const deleteTask = Task.deleteTask;
const completedTask = Task.completedTask;

//tasks handle

router.get('/tasks', ensureAuthenticated, async (req, res) => {
    const user = req.user._id;
    const tasks = await modelTask.find({ user: user });
    const statuses = await Status.find();
    const labels = await Label.find();

    const data = [tasks, statuses, labels];
    res.json(data);
});

router.put('/completed', ensureAuthenticated, async (req, res) => {
    const taskId = req.params.id;
    completedTask(res, taskId);
});

router.post('/tasks', ensureAuthenticated, async (req, res) => {
    const user = req.user._id;
    const {
        title,
        description,
        status,
        label
    } = req.body;
    var stat = req.body;
    saveNewTask(res, user, status, title, description, label);
});

router.put('/tasks', ensureAuthenticated, (req, res) => {
    const taskId = req.params.id;
    const {
        title,
        description,
        label,
        status
    } = req.body;
    updateTask(res, taskId, title, description, status, label);
});

router.delete('/task', ensureAuthenticated, (req, res) => {
    const taskId = req.params.id;
    deleteTask(res, taskId);
});


module.exports = router;