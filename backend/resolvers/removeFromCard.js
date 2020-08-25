const { findIndex, cloneDeep } = require( 'lodash' );

const Cart = require( '../models/Cart' );
const getLoggedInUserId = require( '../utils/getLoggedInUserId' );

const removeFromCard = async ( parent, args, request ) => {

    try {
        const userId = getLoggedInUserId( request );

        if( !userId ) {
            return {
                status: 'error',
                msg: 'Please Login',
            };
        }

        const { productId, removeProduct, clearCart } = args;


        if( !clearCart && !productId ) {
            return {
                status: 'error',
                msg: 'Product is not available',
            };
        }

        // see if user exists
        let cart = await Cart.findOne( { user: userId } );

        if( !cart ) {
            
            return {
                status: 'error',
                msg: 'Please add Products to cart',
            };
        }
        if( clearCart ) {
            cart.products = [];
        } else if ( removeProduct ) {

            cart.products = cart.products.filter( ( { _id = '' } = {} ) => {
                return _id != productId
            } );
        } else {
            
            const index = findIndex( cart.products, ( item ) => {
                return item._id = productId;
            } );

            if( -1 === index ) {
                return {
                    status: 'error',
                    msg: 'Product is not present on cart',
                    products: cart.products
                }
            }

            const _products = cloneDeep( cart.products );

            _products.splice( index, 1 );

            cart.products = _products;
        }

        await cart.save();

        return {
            status: 'success',
            msg: 'Cart has been updated',
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
    removeFromCard
};