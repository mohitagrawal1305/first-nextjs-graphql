import Link from 'next/link'
import { useQuery, useMutation } from '@apollo/client';
import { head } from 'lodash';
import { CircularProgress } from '@material-ui/core';
import { useState } from 'react';

import { getAllProductsQuery } from 'query/products';
import { cartQuery } from 'query/cart';
import { button as Button } from 'modules/button'
import { addToCard } from 'mutations/cart';
import { dialog as Dialog } from '../dialog';
import { getToken } from 'utils/getToken';

const ProductItem = ( props ) => {

    const [ addItemToCard, { loading } ] = useMutation( addToCard );

    const handleAddItemToCart = async ( event ) => {

        event && event.preventDefault();
        
        const token = getToken();
        
        if( token ) {
            await addItemToCard( {
                variables: {
                    productId: props._id
                },
                refetchQueries: [ { query: cartQuery } ]
            } );
        } else {
            props.triggerLoginForm();
        }
        
    };

    return (
        <Link href="/product/[id]" as={ `/product/${ props._id }` } >
        <div className = 'products-list__item' >
            <div className = 'products-list__item__image' style = { { backgroundImage: `url( ${ head( props.images ) } )` } } />
            <div className = 'products-list__item__content' >
                <div className = 'products-list__item__content__wrapper' >
                    <h2 className = 'products-list__item__content__title' >{ props.name }</h2>
                    <span className = 'products-list__item__content__price' > Rs. { props.price } </span>
                </div>
                <Button className = 'products-list__item__content__add-to-cart' onClick = { handleAddItemToCart } >
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
        </Link>
    );
};


export const ProductsList = ( props ) => {

    const { loading, error, data } = useQuery( getAllProductsQuery, {
        variables: { query: props.query },
    } );
    
    const [ isOpen, setOpen ] = useState( false );

    const toggleLoginForm = () => {
        setOpen( !isOpen );
    };

    if( loading || error ) {
      return (
        <div className = 'products-list' >
            {
                [ 0,1,2,3,4,5 ].map( index => {
                    return (
                        <div key ={ index } className = 'products-list__item' >
                            <div className = 'products-list__item__image products-list__item__image__preload'>
                            </div>
                            <div className = 'products-list__item__content' >
                                <div className = 'products-list__item__content__wrapper' >
                                    <h2 className = 'products-list__item__content__title' ></h2>
                                    <span className = 'products-list__item__content__price' />
                                </div>
                            </div>
                        </div>
                    );
                } )
            }
        </div>
      );
    }
    const { getAllProducts = [] } = data;
    return (
        <>
            <div className = 'products-list' >
                    {
                        getAllProducts.map( item => (
                            <ProductItem { ...item } key = { item._id } triggerLoginForm = { toggleLoginForm } />
                        ) )
                    }
            </div> 
            <Dialog
                isOpen = { isOpen }
                toggleLoginForm = { toggleLoginForm }
            />
        </>
    )
}

ProductsList.defaultProps = {
    query: ''
};