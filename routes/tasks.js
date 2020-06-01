const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");

const Label = require("../models/Label");
const Status = require("../models/Status");

const Task = require("../controller/TaskController");
const saveNewTask = Task.saveNewTask;
const updateTask = Task.updateTask;
const deleteTask = Task.deleteTask;
const completedTask = Task.completedTask;
const getAllTasks = Task.getAllTasks;

//tasks handle
router.get( '/tasks', ensureAuthenticated, async ( req, res ) => {
  const user = req.user._id;
  getAllTasks( res, user );
});

router.put( '/completed-task/:id', ensureAuthenticated, async ( req, res ) => {
  const taskId = await req.params.id;
  completedTask( res, taskId );
});

router.post( '/task', ensureAuthenticated, async ( req, res ) => {
  const user = req.user._id;
  const { title, description, status, label, estDate } = req.body;
  var stat = req.body;
  saveNewTask( res, user, status, title, description, label, estDate );
});

router.put( '/task/:id', ensureAuthenticated, async ( req, res ) => {
  const taskId = req.params.id;
  const { title, description, label, status, estDate } = req.body;
  updateTask( res, taskId, title, description, status, label, estDate );
});

router.delete( '/task/:id', ensureAuthenticated, async ( req, res ) => {
  const taskId = req.params.id;
  deleteTask( res, taskId );
});

//@desc routes for labels and statuses
router.get( '/labels', ensureAuthenticated, async ( req, res ) => {
  const labels = await Label.find();
  res.status( 200 ).json( { 'success': true, 'response': labels[0]['labels'] } )
});

router.get( '/statuses', ensureAuthenticated, async ( req, res ) => {
  const statuses = await Status.find();
  res.status( 200 ).json( { 'success': true, 'response': statuses[0]['statuses'] } )
});

module.exports = router;