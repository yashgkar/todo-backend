const Task = require('../models/Task');


module.exports = {

    saveNewTask: (res, user, title, data, label) => {
        const newTask = new Task({
            User: user,
            Title: title,
            Data: data,
            Label: label
        });
        newTask.save()
            .then(res.send('saved task'))
            .catch(err => { console.log(err) });
    },
    updateTask: (res, taskid, title, data, status, label) => {
        Task.findOneAndUpdate(taskid, {
            title: title,
            data: data,
            status: status,
            label: label
        })
            .then(res.send('Updated task'))
            .catch(err => { console.log(err) });
    }


}