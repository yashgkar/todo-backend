const Task = require('../models/Task');


module.exports = {

    saveNewTask: (res, user, status, title, description, label) => {
        const newTask = new Task({
            user: user,
            title: title,
            description: description,
            label: label,
            status: status
        });
        newTask.save()
            .then(res.send('saved task'))
            .catch(err => { console.log(err) });
    },
    updateTask: (res, taskId, title, description, status, label) => {
        Task.findOneAndUpdate(taskId, {
            title: title,
            description: description,
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
    },
    completedTask: (res, taskId) => {
        Task.findOneAndUpdate(taskId, {
            completionStatus:{
                status: "Completed",
                date: Date.now()
            }
        })
            .then(res.send('Task Completed'))
            .catch(err => { console.log(err) });
    }
}