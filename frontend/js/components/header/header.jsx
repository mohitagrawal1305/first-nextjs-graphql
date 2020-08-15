import { useEffect, useState } from 'react';
import { throttle } from 'lodash';
import Link from 'next/link';
import { useApolloClient } from '@apollo/client';
import { button as Button } from 'modules/button'

export const header = () => {
    const [ isSticky, setSticky ] = useState( false );
    const [ isUserLoggedIn, setUserLoggedIn ] = useState( false );

    const client = useApolloClient();

    const onScroll = throttle( () => {
        
        const scrollY = window.scrollY || window.pageYOffset;
        
        const stuck = 10 < scrollY;
        
        setSticky( stuck );
        
    }, 200 );

    useEffect(() => {
        
        const token = localStorage.getItem('token');
        
        if( token ) {
            setUserLoggedIn( true );
        }
        onScroll();
        window.addEventListener( 'scroll', onScroll );
        

        return () => {
            window.removeEventListener( 'scroll', onScroll );
        }
    }, [] )

    return (
        <header className = { `header ${ isSticky ? 'header--sticky' : '' }` } >
            <svg className='header__logo' version="1.1" id="Capa_1"  xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" xmlSpace="preserve">
                <polygon fill="#AEADB3"  points="512,43.935 512,468.065 360.62,468.065 360.62,266.815 256.14,371.285 256.12,371.265 
                256,371.385 245.37,360.805 151.38,266.815 151.38,468.065 0,468.065 0,43.935 142.6,43.935 256,157.335 369.4,43.935 "/>
                <polygon fill="#78777F" points="512,43.935 512,468.065 360.62,468.065 360.62,266.815 256.14,371.285 256.12,371.265 
                256,371.385 256,157.335 369.4,43.935 "/>
            </svg>

            <nav className='header__navigations' >
            {
                !isUserLoggedIn ? (
                    <Link href="/login">
                    <Button>login</Button>
                    </Link>
                ) : (
                    <Button
                        onClick = { () => {
                            localStorage.removeItem("token");
                            client.resetStore();
                            setUserLoggedIn( false );
                        } }
                    >
                    Logout
                    </Button>
                )
                }
            </nav>
        </header>   
    )
}
header.defaultProps = {};