const Task = require("../models/Task");

module.exports = {
  saveNewTask: (res, user, status, title, description, label) => {
    const newTask = new Task({
      user: user,
      title: title,
      description: description,
      label: label,
      status: status,
    });
    newTask.save((err, result) => {
      if (err) {
        throw err;
      }
      if (result) {
        res.send("Saved task succesfully");
        //or
        //res.json(result)
        //the json obj returns the saved data in json format
      }
    });
  },
  updateTask: (res, taskId, title, description, status, label) => {
    Task.findOneAndUpdate(taskId, {
      title: title,
      description: description,
      status: status,
      label: label,
    })
      .then(res.send("Updated task"))
      .catch((err) => {
        res.send(err);
      });
  },
  deleteTask: (res, taskId) => {
    Task.findByIdAndDelete(taskId)
      .then(res.send("Task deleted!"))
      .catch((err) => {
        res.send(err);
      });
  },
  completedTask: (res, taskId) => {
    Task.findOneAndUpdate(taskId, {
      completionDate: Date.now(),
    })
      .then(res.send("Task Completed"))
      .catch((err) => {
        res.send(err);
      });
  },
};
