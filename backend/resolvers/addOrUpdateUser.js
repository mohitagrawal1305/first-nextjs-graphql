const gravatar = require( 'gravatar' );
const bcryptjs = require( 'bcryptjs' );
const jwt = require( 'jsonwebtoken' );
const User = require( '../models/User' );
const OTPModel = require( '../models/Otp' );
const mailer = require( '../utils/mailer' );

const addOrUpdateUser = async ( { parent, args, newUser } ) => {

    try {
        const { email, password, confirmPassword, name, otp } = args;

        if( password !== confirmPassword ) {
            return {
                status: 'error',
                msg: 'Confirm password should be same as password',
                token: null
            };
        }

        // see if user exists
        let user = await User.findOne( { email } );

        if( newUser && user ) {
            return {
                status: 'error',
                msg: 'User already exists, Please Login',
                token: null
            };
        } else if( !newUser && !user ) {
            return {
                status: 'error',
                msg: 'Please register.',
                token: null
            };
        }

        if( !user && newUser ) {

            // Get user avatar based on the email
            const avatar = gravatar.url( email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            } );
            
            // create new user instance
            user = new User( {
                name,
                email,
                avatar,
                password
            } );
        }

        // see if user exists
        let userWithOTP = await OTPModel.findOne( { email } );

        if( !userWithOTP ) {
            return {
                status: 'error',
                msg: 'Please click on previous button and click on send OTP.',
                token: null
            };
        }

        if( userWithOTP.otp !== otp ) {
            return {
                status: 'error',
                msg: 'Please enter Correct OTP',
                token: null
            };
        }

        await userWithOTP.remove();


        const salt = await bcryptjs.genSalt( 10 );

        // encrypt password
        user.password = await bcryptjs.hash( password, salt );

        await user.save();

        // return json web token
        const payload = {
            user: {
                id: user.id
            }
        };

        const token = await jwt.sign(
            payload,
            'mySecretToken',
            { expiresIn: 360000 }
        );

        if( newUser ) {
            await mailer( {
                to: email,
                subject: 'Welcome to Next Shop',
                text: `Hello ${ name }, Welcome to Next Shop`
            } );
        } else {
            await mailer( {
                to: email,
                subject: 'Password re-set successfully',
                text: `Hello ${ user.name }, your password has been reset successfully`
            } );
        }

        return {
            status: 'success',
            msg: 'Login success',
            token: token,
        };
        
    } catch( err ) {
        console.log( err.message );
        return {
            token: null,
            msg: err.message,
            status: 'error'
        };
    }   
};

module.exports = {
    addOrUpdateUser
};