import { useMutation } from '@apollo/client';
import { CircularProgress } from '@material-ui/core';
import { useState, useContext } from 'react';

import { cartQuery } from 'query/cart';
import { button as Button } from 'modules/button'
import { addToCard } from 'mutations/cart';
import { dialog as Dialog } from '../dialog';
import { globalContext } from '../../store';


export const Product = ( props ) => {

    const [ isOpen, setOpen ] = useState( false );
    const [ addItemToCard, { loading } ] = useMutation( addToCard );
    const { store } = useContext( globalContext );

    const toggleLoginForm = () => {
        setOpen( !isOpen );
    };

    const handleAddItemToCart = async ( event ) => {

        event && event.preventDefault();
        
        if( store.isUserLoggedIn ) {
            await addItemToCard( {
                variables: {
                    productId: props.id
                },
                refetchQueries: [ { query: cartQuery } ]
            } );
        } else {
            toggleLoginForm();
        }
        
    };

    return (
        <>
            <div className = 'product' >
            <h1 className = 'product__title not-desktop ' >{ props.name }</h1>
                <div className = 'product__images' >
                    {
                        props.images.map( image => {
                            return (
                                <div className = 'product__image' style = { { backgroundImage: `url( ${ image } )` } } />
                            );
                        } )
                    }
                </div>
                    
                    <div className = 'product__details' >
                        <h1 className = 'product__details__title' >{ props.name }</h1>
                        <h2 className = 'product__details__description' >{ props.description }</h2>
                        <div className = 'product__details__price' > Rs. { props.price } </div>
                        <Button className = 'product__details__add-to-cart' onClick = { handleAddItemToCart } >
                            {
                                loading ? (
                                    <CircularProgress size = { 25 } />

                                ) : (
                                    'Add to Cart'
                                )
                            }
                        </Button>
                    </div>
            </div> 
            <Dialog
                isOpen = { isOpen }
                toggleLoginForm = { toggleLoginForm }
            />
        </>
    )
}

Product.defaultProps = {};