import { useState } from 'react';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import Drawer from '@material-ui/core/Drawer';
import { cartQuery } from 'query/cart';
import { useQuery } from '@apollo/client';
import { get, isEmpty, find, cloneDeep, head } from 'lodash';
import { CircularProgress } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const ProductItem = ( props ) => {
    return (
        <li className='cart__items__item' >
            <div className='cart__items__item__image' style = { { backgroundImage: `url( ${ head( props.images ) } )` } } />
            <div className='cart__items__item__details' >
                <h1 className='cart__items__item__details__title' > { props.name } </h1>
                <div className='cart__items__item__details__detail' >
                    <span> Quantity: { props.quantity }</span>
                    <span> Price: { props.quantity * props.price } </span>
                </div>
            </div>
            
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
                    <CloseIcon className = 'cart__drawer__close' fontSize='large' onClick = { () => { setOpen( !isOpen ); }  }/>
                   {
                       isEmpty( products ) ? (
                           <div className = 'cart__empty' >
                               Add products to cart
                           </div>
                       ) : (
                            <>
                                <ul className='cart__items' >
                                    {
                                            products.map( product => {
                                                return (
                                                    <ProductItem key = { product._id } { ...product } />
                                                );
                                            } )
                                    }
                                </ul>
                                <div className='cart__items__total' >Total: Rs. { totalPrice }</div>
                            </>
                       )
                   }
                </div>
            </Drawer>
        </>
    )
}
cart.defaultProps = {};