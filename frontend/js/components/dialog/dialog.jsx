import { Dialog } from '@material-ui/core';
import { login as LoginContainer } from '../login'

export const dialog = ( props ) => {

    
    return ( 
        <Dialog open = { props.isOpen } onClose={ props.toggleLoginForm } >
            <div className = 'dialog' >
                <LoginContainer loginSuccess = { props.toggleLoginForm }  />
            </div>
        </Dialog>
    )
}
dialog.defaultProps = {};