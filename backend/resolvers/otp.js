const User = require( '../models/User' );
const OtpModel = require( '../models/Otp' );
const mailer = require( '../utils/mailer' );

const otpGenerator = async ( parent, args ) => {

    try {
        const { email, newUser } = args;

        // see if user exists
        let user = await User.findOne( { email } );

        if( newUser && user ) {
            return {
                status: 'error',
                msg: 'User already exists'
            };
        } else if( !newUser && !user ) {
            return {
                status: 'error',
                msg: 'Please register.'
            };
        }

        const token = Math.floor(100000 + Math.random() * 900000);
        let userWithOTP = await OtpModel.findOne( { email } );
        
        userWithOTP && await userWithOTP.remove();

        const otpObj = new OtpModel( {
            email,
            otp: token
        } );

        // save user on db
        await otpObj.save();

        const mailStatus = await mailer( {
            to: email,
            subject: 'OTP',
            text: `Your OTP is ${ token }`
        } );

        if( mailStatus ) {
            return {
                status: 'success',
                msg: 'OTP sent successfully'
            };
        } else {
            return {
                status: 'error',
                msg: 'Something went wrong'
            };
        }
        
    } catch( err ) {
        console.log( err.message );
        return {
            status: 'error',
            msg: 'Something went wrong'
        };
    }               
};


module.exports = {
    otpGenerator
};