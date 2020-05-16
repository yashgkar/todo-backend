const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    CreationDate: {
        type: Date,
        default: Date.now()
    },
    Data: {
        type: String,
        required: true
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