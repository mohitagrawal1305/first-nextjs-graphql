const { CartType } = require( '../types/cart' );
const Cart = require( '../../models/Cart' );
const graphql = require( 'graphql' );
const getLoggedInUserId = require( '../../utils/getLoggedInUserId' );

const {
    GraphQLList,
} = graphql;

module.exports = {
    type: new GraphQLList( CartType ),
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