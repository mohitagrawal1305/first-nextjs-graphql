const mongoose = require( 'mongoose' );

const otpSchema = new mongoose.Schema( {
    email: {
        type: String,
        required: true,
        unique: true
    },
    otp: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
} );

module.exports = mongoose.models.otp || mongoose.model( 'otp', otpSchema );