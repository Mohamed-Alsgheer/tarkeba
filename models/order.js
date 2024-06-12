const mongoose = require('mongoose');
const schema = mongoose.Schema;
const orderSchema = mongoose.Schema({
    user: { type: schema.Types.ObjectId, required: true, ref: 'user' },
    cart: { type: Object, required: true },
    shippingAddress: {
        name: { type: String, required: true },
        government: { type: String, required: true },
        city: { type: String, required: true },
        street: { type: String, required: true },
    },
    phone: { type: String, required: true },
    orderPrice: { type: Number, required: true },
    coupon: { type: String },
    shippingFee: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    isPaid: { type: Boolean, required: true, default: false },
    status: { type: String, required: true }, //Delivered //Pending //Processing //Cancel //Returned
    note: { type: String },
    returnedOrder: {
        products: [Object],
        refund: { type: Number }
    },
    deliveredAt: { type: String },
    invoice: { type: Number, required: true }
}, { timestamps: true });


module.exports = mongoose.model('order', orderSchema);