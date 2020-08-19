const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const OrderSchema = new Schema( {
    amount: {
        type: Number,
        required: true,
    },
    products: [ {
        product: {
            type: Schema.Types.ObjectId,
            ref: 'product'
        },
        quantity: {
            type: Number,
            default: 1
        }
    } ],
    address: {
        line1: {
            type: String,
            required: true,
        },
        line2: {
            type: String,
        },
        city: {
            type: String,
        },
        state: {
            type: String,
        },
        zip: {
            type: String,
        }
    },
    status: {
        type: String,
    },    
    date: {
        type: Date,
        default: Date.now
    }
} );

module.exports = mongoose.models.order || mongoose.model( 'order', OrderSchema );