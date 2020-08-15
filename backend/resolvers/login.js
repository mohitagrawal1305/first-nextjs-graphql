const bcryptjs = require( 'bcryptjs' );
const jwt = require( 'jsonwebtoken' );
const User = require( '../models/User' );

const loginUsingGoogle = async ( parent, args ) => {

    try {
        const { email } = args;

        // see if user exists
        let user = await User.findOne( { email } );

        if( !user ) {
            return {
                token: null,
                msg: 'Please register.'
            };
        }

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

        return {
            token: token,
            msg: 'Login success'
        };
        
    } catch( err ) {
        console.log( err.message );
        return {
            token: null,
            msg: err.message
        };
    }               
};

const login = async ( parent, args ) => {

    try {
        const { email, password } = args;

        // see if user exists
        let user = await User.findOne( { email } );

        if( !user ) {
            return {
                token: null,
                msg: 'Invalid Credentials'
            };
        }

        const isMatch = await bcryptjs.compare( password, user.password );

        if( !isMatch ) {
            return {
                token: null,
                msg: 'Invalid Credentials'
            };
        }


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

        return {
            token: token,
            msg: 'Login success'
        };
        
    } catch( err ) {
        console.log( err.message );
        return {
            token: null,
            msg: err.message
        };
    }               
};

module.exports = {
    login,
    loginUsingGoogle
};