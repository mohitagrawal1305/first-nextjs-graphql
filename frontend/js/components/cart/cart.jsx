import { useState } from 'react';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import Drawer from '@material-ui/core/Drawer';

export const cart = () => {

    const [ isOpen, setOpen ] = useState( false );
    const [ direction, setDirection ] = useState( '' );
    
    return ( 
        <>
            <div className = 'cart not-mobile' onClick = { () => { setOpen( !isOpen ); setDirection( 'right' ); } } >
                <LocalMallIcon fontSize='large'/>
                <span className = 'cart__count' >0 items</span>
            </div>

            <div className = 'cart--mobile not-desktop not-ipad' onClick = { () => { setOpen( !isOpen ); setDirection( 'bottom' ); } } >
                <LocalMallIcon  />
                <span className = 'cart--mobile__count' >0 items</span>
            </div>

            <Drawer anchor = { direction } open = { isOpen } onClose={ () => { setOpen( !isOpen ); } }>
                <div className = { `cart__drawer cart__drawer__directions--${ direction }` } >
                    Hello
                </div>
            </Drawer>
        </>
    )
}
cart.defaultProps = {};