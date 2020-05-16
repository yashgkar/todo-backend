const express = require('express');
const router = express.Router();
const {
    ensureAuthenticated
} = require('../config/auth');

const Task = require('../models/Task');

//tasks handle

router.get('/tasks', ensureAuthenticated, (req, res) => {
    res.send('logged in');
});


router.post('/tasks', ensureAuthenticated, (req, res) => {
    
    const{
        title,
        data,
        label
    } = req.body;

    const newTask = new Task({
        User: req.user._id,
        Title: title,
        Data: data,
        Label: label
    });
    newTask.save()
        .then(res.send('saved task'))
        .catch(err => { console.log(err) });
});


module.exports = router;