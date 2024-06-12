const mongoose = require('mongoose');

const shippingSchema = mongoose.Schema({
    shippingPrice: { type: Number, required: true },
    deliveryPlaces: [{ 
        state: { type: String, required: true },
        possibility: { type: Boolean, required: true }
    }]
}, { timestamps: true });

module.exports = mongoose.model('shipping', shippingSchema);