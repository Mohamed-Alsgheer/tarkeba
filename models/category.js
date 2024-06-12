const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    pageTitle: { type: String, required: true },
    metaDesc: { type: String, required: true },
    name: { type: String, required: true, trim: true, unique: true },
    slug: { type: String, required: true, trim: true, unique: true },
    image: {
        public_id: { type: String },
        url: { type: String }
    },
    parent: { type: String, required: true },
    items: { type: Number, required: true, default: 0 },
    visibility: { type: String, required: true },
    publishDate: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('categories', categorySchema);