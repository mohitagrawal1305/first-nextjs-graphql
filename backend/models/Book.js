const mongoose = require( 'mongoose' );

const Schema = mongoose.Schema;

const BookSchema = new Schema( {
    name: {
        type: Schema.Types.String
    },
    genre: {
        type: Schema.Types.String
    },
    authorId: {
        type: Schema.Types.String
    }
} );

module.exports = mongoose.models.Book || mongoose.model( 'Book', BookSchema );
