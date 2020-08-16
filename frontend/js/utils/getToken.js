import { head } from 'lodash';

export const getToken = () => {
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookies = decodedCookie.split(';');
    const tokenString = head( cookies.filter( item => item.match( 'token' ) ) );
    if( tokenString ) {
        const token = tokenString.replace( ' token=', '' );

        if( 'null' === token ) {
            return null;
        }
        return token
    }
    return null;
};