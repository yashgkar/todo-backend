const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now()
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    status: {
        type: String,
        default: "Active"
    },
    label: {
        type: String,
        default: "Others"
    },
    completionStatus: {
        status: {
            type: String,
            default: 'Pending'
        },
        date: {
            type: Date
        }
    }
}, {
    timestamps: true,
}
);

const Task = mongoose.model('Task', TaskSchema);
module.exports = Task;