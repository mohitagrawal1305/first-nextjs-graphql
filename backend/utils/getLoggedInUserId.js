const nextCookie = require( 'next-cookies' );
const jwt = require( 'jsonwebtoken' );

const getLoggedInUserId = ( request ) => {
    const { token } = nextCookie( { req: request } );
    if( 'null' === token ) {
        return null;
    }
    const { user } = jwt.verify( token, 'mySecretToken' );
    if( user ) {
        return user.id;
    } else {
        return null
    }
};

module.exports = getLoggedInUserId;