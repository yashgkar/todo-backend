const mongoose = require('mongoose');

const StatusSchema = new mongoose.Schema({
    statuses: {
        type: Array
    }
});

const Status = mongoose.model('statuses', StatusSchema);
module.exports = Status;