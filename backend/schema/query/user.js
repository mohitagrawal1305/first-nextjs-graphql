const User = require( '../../models/User' );
const { UserType } = require( '../types/user' );

const getLoggedInUserId = require( '../../utils/getLoggedInUserId' );

module.exports = {
    type: UserType,
    async resolve( parent, args, request ) {
        
        const userId = getLoggedInUserId( request );
        if( userId ) {
            const _user = await User.findById( userId );
            
            return _user;
        }
    }
};