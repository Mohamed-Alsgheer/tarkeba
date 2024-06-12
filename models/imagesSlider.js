const mongoose = require('mongoose');

const sliderSchema = mongoose.Schema({
    img: { 
        public_id: { type: String, required: true },
        url: { type: String, required: true }
     },
    objectFit: { type: String, required: true },
    order: { type: String, required: true },
    linkStatus: { type: String, required: true },
    link: { type: String },
    btnValue: { type: String },
    btnColor: { type: String },
    fontColor: { type: String },
    coordinates: {
        x: { type: String },
        y: { type: String }
    }

});

module.exports = mongoose.model('slider', sliderSchema);