const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    User:{
        type: String,
        required: true
    },
    CreationDate: {
        type: Date,
        default: Date.now()
    },
    Title:{
        type: String
    },
    Data: {
        type: String
    },
    Status: {
        type: String,
        default: "Active"
    },
    Label: {
        type: String,
        default: "Others"
    },
    DateOfCompletion: {
        type: Date
    }
}, {
    timestamps: true,
}
);

const Task = mongoose.model('Task', TaskSchema);
module.exports = Task;