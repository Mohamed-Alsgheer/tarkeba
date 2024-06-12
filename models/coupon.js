const mongoose = require('mongoose');


const couponSchema = mongoose.Schema({
    code: {
        required: true,
        type: String
    },
    type: {
        required: true,
        type: String
    },
    discountValue: {
        required: true,
        type: String
    },
    status: {
        required: true,
        type: String
    },
    startDate: {
        required: true,
        type: String
    },
    endDate: {
        type: String
    },
    usageLimit: {
        required: true,
        type: String
    },
    newUsers: {
        required: true,
        type: Boolean
    }
});

module.exports = mongoose.model('coupon', couponSchema);