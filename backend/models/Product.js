const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const ProductSchema = new Schema( {
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,  
    },
    likes: [ {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
    } ],
    quantity: {
        type: Number,
        required: true
    },
    comments: [ {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        },
        text: {
            type: String,
            required: true
        },
        name: {
            type: String
        },
        date: {
            type: Date,
            default: Date.now
        }
    } ],
    images: {
        type: [String]
    },
    date: {
        type: Date,
        default: Date.now
    }
} );

module.exports = mongoose.models.product || mongoose.model( 'product', ProductSchema );