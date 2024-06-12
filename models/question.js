const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    question: {
        required: true,
        type: String
    },
    answer: {
        required: true,
        type: String
    }
});

module.exports = mongoose.model('Questions', questionSchema);