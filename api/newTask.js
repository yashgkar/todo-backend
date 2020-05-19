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
    }


}