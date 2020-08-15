import { useEffect } from 'react';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/router';

export const checkIfLoggedIn = ( { isPrivateRoute } ) => {

    const router = useRouter();

    useEffect( () => {
        const token = localStorage.getItem('token');
        
        if( isPrivateRoute && isEmpty( token ) ) {
            router.push( '/login' );
        }
        if( !isPrivateRoute && !isEmpty( token ) ) {
            router.push('/');
        }
    }, [] );
};