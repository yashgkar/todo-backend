const Task = require("../models/Task");

module.exports = {

  getAllTasks: async( res, user ) => {
    const tasks = await Task.find( { user: user } );
    res.status( 200 ).json( { 'success': true, 'response': tasks } );
  },

  saveNewTask: async( res, user, status, title, description, label, estDate, priority ) => {
    const newTask = new Task( {
      user: user,
      title: title,
      description: description,
      label: label,
      status: status,
      estimatedCompletionDate: estDate,
      priority: priority
    } );
    newTask.save( ( err, result ) => {
      if (err) {
        res.status( 500 ).json( { 'success': false, 'response': err } );
      }
      if( result ) {
        res.status( 200 ).json( { 'success': true, 'response': 'Task saved succesfully' } );
      }
    });
  },

  updateTask: async ( res, taskId, title, description, status, label, estDate, priority ) => {
    Task.findByIdAndUpdate( taskId, {
      title: title,
      description: description,
      status: status,
      label: label,
      estimatedCompletionDate: estDate,
      priority: priority
    } )
    .then( res.status( 200 ).json( { 'success': true, 'response': 'Task updated succesfully' } ) )
    .catch( ( err ) => {
        res.status( 500 ).json( err );
      } );
  },

  deleteTask: ( res, taskId ) => {
    Task.findByIdAndDelete( taskId )
      .then( res.status( 200 ).json( { 'success': true, 'response': 'Task deleted succesfully' } ) )
      .catch( ( err ) => {
        res.status( 500 ).json( err );
      } );
  },

  completedTask: async ( res, taskId ) => {
    Task.findByIdAndUpdate( taskId, {
      status: 'Completed',
      completionDate: Date.now(),
    } )
    .then( res.status( 200 ).json( { 'success': true, 'response': 'Task updated succesfully' } ) )
    .catch( ( err ) => {
        res.status( 500 ).json( err );
      } );
  },
};
