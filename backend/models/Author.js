const mongoose = require( 'mongoose' );

const Schema = mongoose.Schema;

const AuthorSchema = new Schema( {
    name: {
        type: Schema.Types.String
    },
    age: {
        type: Schema.Types.Number
    }
} );

module.exports = mongoose.models.Author || mongoose.model( 'Author', AuthorSchema );
