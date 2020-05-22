const express = require('express');
const router = express.Router();
const {
    ensureAuthenticated
} = require('../config/auth');

const User = require('../models/UserData');
const modelTask = require('../models/Task');

const Task = require('../controller/newTask');
const saveNewTask = Task.saveNewTask;
const updateTask = Task.updateTask;
const deleteTask = Task.deleteTask;


//tasks handle

router.get('/tasks', ensureAuthenticated, async (req, res) => {
    const tasks = await modelTask.find();
    res.json(tasks);
});


router.post('/tasks', ensureAuthenticated, async (req, res) => {
    const user = req.user._id;
    // const {
    //     title,
    //     data,
    //     status,
    //     label
    // } = req.body;
    var stat = req.body;

    const check = await User.findOne({email:req.user.email});
    //var arr = check.userstatuses;
    if(check.userstatuses.includes(stat)){
        console.log('exists')
    }
    else{
        console.log('new status');
    }
    //console.log(arr);

    //saveNewTask(res, user, status, title, data, label);
});

router.post('/tasks/update', ensureAuthenticated, (req, res) => {
    const taskId = req.params.id;
    const {
        title,
        data,
        label,
        status
    } = req.body;
    updateTask(res, taskId, title, data, status, label);
    console.log('Updated!');
});

router.delete('/task/delete', ensureAuthenticated, (req, res) => {
    const taskId = req.params.id;
    deleteTask(res, taskId);
});


module.exports = router;