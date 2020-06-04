const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    creationDate: {
      type: Date,
      default: Date.now(),
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      default: "New",
    },
    label: {
      type: String,
      default: "Others",
    },
    priority: {
      type: String,
      default: "Normal",
    },
    completionDate: {
      type: Date
    },
    estimatedCompletionDate:{
      type: Date
    }
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", TaskSchema);
module.exports = Task;
