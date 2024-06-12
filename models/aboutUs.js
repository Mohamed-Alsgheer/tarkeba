const mongoose = require('mongoose');

const aboutSchema = mongoose.Schema({
    text: { type: String, required: true }
    
}, { timestamps: true });

module.exports = mongoose.model('about', aboutSchema);