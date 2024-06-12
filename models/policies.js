const mongoose = require('mongoose');

const PolicySchema = mongoose.Schema({
    policyType: { required: true, type: String },
    text: { required: true, type: String },
    
}, { timestamps: true });

module.exports = mongoose.model('Policy', PolicySchema);