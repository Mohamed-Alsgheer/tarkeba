const mongoose = require('mongoose');
const schema = mongoose.Schema;

const addressSchema = mongoose.Schema({
    user: {
        type: schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    name: {
        required: true,
        type: String
    },
    phone: {
        required: true,
        type: String
    },
    government: {
        required: true,
        type: String
    },
    city: {
        required: true,
        type: String
    },
    street: {
        required: true,
        type: String
    },
    building: {
        required: true,
        type: String
    },
    floor: {
        required: true,
        type: String
    }
});

module.exports = mongoose.model('address', addressSchema);