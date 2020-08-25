const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const CartSchema = new Schema( {
    products: {
        type: [Schema.Types.ObjectId],
        ref: 'product'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    date: {
        type: Date,
        default: Date.now
    }
} );

module.exports = mongoose.models.cart || mongoose.model( 'cart', CartSchema );