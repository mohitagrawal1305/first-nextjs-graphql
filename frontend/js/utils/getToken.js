import cookies from 'next-cookies';

export const getToken = () => {
    
    const { token } = cookies( { req: { cookies: document.cookie } } );
    if( token ) {

        if( 'null' === token ) {
            return null;
        }
        return token
    }
    return null;
};