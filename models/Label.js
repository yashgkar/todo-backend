const mongoose = require('mongoose');

const LabelSchema = new mongoose.Schema({
    labels: {
        type: Array
    }
}
);

const Label = mongoose.model('labels', LabelSchema);
module.exports = Label;