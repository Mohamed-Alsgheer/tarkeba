const mongoose = require('mongoose');
const User = require('./user');

const reviewSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: User },
    name: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
    date: { type: String }
});

const customProductSchema = mongoose.Schema({
    pageTitle: { type: String, trim: true, required: true },
    metaDesc: { type: String, trim: true, required: true },
    pricing: {
        price: { type: Number, required: true },
        salePrice: { type: Number },
        discount: { type: Number }
    },
    desc: { type: String, trim: true, required: true },
    size: [{ type: String }],
    images: [{
        public_id: { type: String, required: true },
        url: { type: String, required: true },
        altText: { type: String, trim: true },
        order: { type: Number },
        selected: { type: Boolean, default: false }
    }],
    sold: { type: Number, required: true, default: 0 },
    reviews: [reviewSchema],
    overallRating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('customProducts', customProductSchema);