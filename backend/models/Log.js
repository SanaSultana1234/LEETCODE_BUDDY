const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    student: {
        type: String,
        required: true
    },
    questions: {
        type: [{num: Number, name: String, level: String}],
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('Log', logSchema);

