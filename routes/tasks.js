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

//const Checker = require('../controller/checker');

//check status and labels
//const statusCheck = () => { };



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
    var status = req.body;

    const statuses = await User.find({ email: req.user.email }, { userstatuses: 1, _id: 0 });
    //const labels = await User.find({ email: req.user.email }, { userlabels: 1, _id: 0 });
    
    if (statuses.includes(status)) {
        
        console.log('status exists');
    }
    else {console.log(statuses);
        console.log('new status');
    }

    //console.log(labels);


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