const Cart = require( '../models/Product' );
const getLoggedInUserId = require( '../utils/getLoggedInUserId' );
const { cloneDeep } = require( 'lodash' );
const addToCart = async ( parent, args, request ) => {

    try {
        const userId = getLoggedInUserId( request );

        if( !userId ) {
            return {
                status: 'error',
                msg: 'Please Login',
            };
        }

        const { productId } = args;

        if( !productId ) {
            return {
                status: 'error',
                msg: 'Product is not available',
            };
        }

        // see if user exists
        let cart = await Cart.findOne( { user: userId } );

        if( !cart ) {
            
            // create new user instance
            cart = new Cart( {
                user: userId,
                products: []
            } );
        }
        
        const products = cloneDeep( cart.products );
        
        products.push( productId );

        cart.products = products;

        console.log( cart );

        await cart.save();

        return {
            status: 'success',
            msg: 'Product has been added to cart',
            products: cart.products
        }

        
    } catch( err ) {
        console.log( err.message );
        return {
            msg: err.message,
            status: 'error'
        };
    }   
};

module.exports = {
    addToCart
};