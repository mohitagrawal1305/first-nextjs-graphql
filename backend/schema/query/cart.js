const { CartType } = require( '../types/cart' );
const Cart = require( '../../models/Cart' );
const getLoggedInUserId = require( '../../utils/getLoggedInUserId' );

module.exports = {
    type: CartType,
    async resolve( parent, args, request ) {

        const userId = getLoggedInUserId( request );

        if( userId ) {
            const _cart = await Cart.findOne( { user: userId } );

            if( _cart ) {

                return _cart;
            }
        }
        return [];
    }
};