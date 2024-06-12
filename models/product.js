const { required } = require('joi');
const mongoose = require('mongoose');
const User = require('./user');

const reviewSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: User },
    name: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
    date: { type: String }
});

const productSchema = mongoose.Schema({
    pageTitle: { type: String, trim: true, required: true },
    metaDesc: { type: String, trim: true, required: true },
    name: { type: String, trim: true, required: true },
    pricing: {
        price: { type: Number, required: true },
        salePrice: { type: Number },
        discount: { type: Number }
    },
    categories: [String],
    desc: { type: String, trim: true, required: true },
    size: { type: String, trim: true, required: true },
    origin: { type: String, required: true },
    fragrance: { type: String, required: true },
    productType: { type: String, trim: true, required: true },
    visibility: { type: String, required: true },
    publishDate: { type: String },
    details: [{
        classification: { type: String, trim: true },
        value: { type: String, trim: true }
    }],
    images: [{
        public_id: { type: String, required: true },
        url: { type: String, required: true },
        altText: { type: String, trim: true },
        order: { type: Number }
    }],
    stock: { type: Number, required: true },
    sold: { type: Number, required: true, default: 0 },
    reviews: [reviewSchema],
    overallRating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Products', productSchema);