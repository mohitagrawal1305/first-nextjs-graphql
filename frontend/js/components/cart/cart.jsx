import { useState } from 'react';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import Drawer from '@material-ui/core/Drawer';
import { cartQuery } from 'query/cart';
import { useQuery } from '@apollo/client';
import { get, isEmpty, find, cloneDeep } from 'lodash';
import { CircularProgress } from '@material-ui/core';

const ProductItem = ( props ) => {
    return (
        <li>
            <h1> { props.name } - { props.quantity } </h1>
        </li>
    );  
};

export const cart = () => {

    const [ isOpen, setOpen ] = useState( false );
    const [ direction, setDirection ] = useState( '' );

    const { loading, error, data } = useQuery( cartQuery );

    const _products = cloneDeep( get( data, 'cart.products', [] ) );

    const total = _products.length;

    let totalPrice = 0;

    const products = [];

    _products.map( product => {
        
        totalPrice = totalPrice + product.price;
        
        const existingProduct = find( products, { _id: product._id } );
        
        if( existingProduct ) {
            existingProduct.quantity = existingProduct.quantity + 1;
        } else {
            products.push( {
                ...product,
                quantity: 1
            } );
        }

    } );
    
    return ( 
        <>
            <div className = 'cart not-mobile' onClick = { () => { setOpen( !isOpen ); setDirection( 'right' ); } } >
                <LocalMallIcon fontSize='large'/>
                <span className = 'cart__count' >
                {
                    loading ? (
                        <CircularProgress size = { 25 } />
                    ) : (
                        `${ total } items`
                    )
                }
                </span>
            </div>

            <div className = 'cart--mobile not-desktop not-ipad' onClick = { () => { setOpen( !isOpen ); setDirection( 'bottom' ); } } >
                <LocalMallIcon  />
                <span className = 'cart--mobile__count' >
                    {
                        loading ? (
                            <CircularProgress size = { 25 } />
                        ) : (
                            `${ total } items`
                        )
                    }
                    
                </span>
            </div>

            <Drawer anchor = { direction } open = { isOpen } onClose={ () => { setOpen( !isOpen ); } }>
                <div className = { `cart__drawer cart__drawer__directions--${ direction }` } >
                   {
                       isEmpty( products ) ? (
                           <div>
                               Add products to cart
                           </div>
                       ) : (
                           <ul>
                               {
                                    products.map( product => {
                                        return (
                                            <ProductItem key = { product._id } { ...product } />
                                        );
                                    } )
                               }
                               Total: Rs. { totalPrice }
                           </ul>
                       )
                   }
                </div>
            </Drawer>
        </>
    )
}
cart.defaultProps = {};