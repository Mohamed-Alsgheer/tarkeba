const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

let userSchema = mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    authType: { type: String },
    authID: { type: String },
    phone: { type: String, default: '_' },
    isVerified: { type: Boolean, default: false },
    role: { type: String, default: 'Customer' },
    numberOfPurchase: { type: Number, default: 0 }
}, { timestamps: true });

userSchema.methods.hashPassword = function (password) {
    return bcrypt.hashSync(password.toString(), bcrypt.genSaltSync(5), null);
}

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}


module.exports = mongoose.model('user', userSchema);