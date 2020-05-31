const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");

const modelTask = require("../models/Task");
const Label = require("../models/Label");
const Status = require("../models/Status");

const Task = require("../controller/newTask");
const saveNewTask = Task.saveNewTask;
const updateTask = Task.updateTask;
const deleteTask = Task.deleteTask;
const completedTask = Task.completedTask;

//tasks handle

router.get("/tasks", ensureAuthenticated, async (req, res) => {
  const user = req.user._id;
  const tasks = await modelTask.find({ user: user });
  res.json(tasks);
});

router.put("/completed/:id", ensureAuthenticated, async (req, res) => {
  const taskId = req.params.id;
  completedTask(res, taskId);
});

router.post("/tasks", ensureAuthenticated, async (req, res) => {
  const user = req.user._id;
  const { title, description, status, label, estDate } = req.body;
  var stat = req.body;
  saveNewTask(res, user, status, title, description, label, estDate);
});

router.put("/tasks/:id", ensureAuthenticated, (req, res) => {
  const taskId = req.params.id;
  const { title, description, label, status, estDate } = req.body;
  updateTask(res, taskId, title, description, status, label, estDate);
});

router.delete("/tasks/:id", ensureAuthenticated, (req, res) => {
  const taskId = req.params.id;
  deleteTask(res, taskId);
});

//@desc routes for labels and statuses

router.get("/labels", ensureAuthenticated, async (req, res) => {
  const labels = await Label.find();
  res.send(labels);
});

router.get("/statuses", ensureAuthenticated, async (req, res) => {
  const statuses = await Status.find();
  res.send(statuses);
});

module.exports = router;