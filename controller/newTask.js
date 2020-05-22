const Task = require('../models/Task');


module.exports = {

    saveNewTask: (res, user, status, title, data, label) => {
        const newTask = new Task({
            User: user,
            Title: title,
            Data: data,
            Label: label,
            Status: status
        });
        newTask.save()
            .then(res.send('saved task'))
            .catch(err => { console.log(err) });
    },
    updateTask: (res, taskId, title, data, status, label) => {
        Task.findOneAndUpdate(taskId, {
            title: title,
            data: data,
            status: status,
            label: label
        })
            .then(res.send('Updated task'))
            .catch(err => { console.log(err) });
    },
    deleteTask: (res, taskId) => {
        Task.findByIdAndDelete(taskId)
            .then(res.send('Task deleted!'))
            .catch(err => { console.log(err) });
    }
}