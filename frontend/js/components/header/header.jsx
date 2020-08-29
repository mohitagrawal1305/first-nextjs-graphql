import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useApolloClient } from '@apollo/client';
import { button as Button } from 'modules/button'
import { getToken } from 'utils/getToken';
import Headroom from 'react-headroom';

export const header = () => {
    const [ isUserLoggedIn, setUserLoggedIn ] = useState( false );

    const client = useApolloClient();

    useEffect(() => {
        
        const token = getToken();
        
        if( token ) {
            setUserLoggedIn( true );
        }
        
    }, [] )

    return (
        <Headroom>
        <header className = { `header` } >
            <svg className='header__logo' version="1.1" id="Capa_1"  xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" xmlSpace="preserve">
                <polygon fill="#AEADB3"  points="512,43.935 512,468.065 360.62,468.065 360.62,266.815 256.14,371.285 256.12,371.265 
                256,371.385 245.37,360.805 151.38,266.815 151.38,468.065 0,468.065 0,43.935 142.6,43.935 256,157.335 369.4,43.935 "/>
                <polygon fill="#78777F" points="512,43.935 512,468.065 360.62,468.065 360.62,266.815 256.14,371.285 256.12,371.265 
                256,371.385 256,157.335 369.4,43.935 "/>
            </svg>

            <nav className='header__navigations' >
            <span className='header__search not-desktop' >
            </span>
            {
                !isUserLoggedIn ? (
                    <Link href="/login">
                    <Button>login</Button>
                    </Link>
                ) : (
                    <Button
                        onClick = { () => {
                            document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
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
        </Headroom>
    )
}
header.defaultProps = {};