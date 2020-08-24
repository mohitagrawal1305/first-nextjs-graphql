const mongoose = require( 'mongoose' );
const db = 'mongodb+srv://admin:admin@first-mern-app.vrxzz.mongodb.net/ecommerce?retryWrites=true&w=majority';

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