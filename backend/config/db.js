const mongoose = require( 'mongoose' );
const config = require( 'config' );
const db = config.get( 'mongoURL' );

const connectDB = async () => {
    
    try {
        await mongoose.connect( db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        } );
        console.log( 'MongoDB Connected' );

    } catch ( e ) {
        console.log( ' DB Connection Error: ', e.message );

        // exit process with failure
        process.exit( 1 );
    }
};

module.exports = connectDB;