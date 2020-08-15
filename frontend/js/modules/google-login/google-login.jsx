import { noop } from 'lodash';
import { GoogleLogin } from 'react-google-login';

export const googleLogin = ( { clientId, onSuccess, onFailure, cookiePolicy, label } ) => {

    return (
        <div className = 'google-login' >
            <GoogleLogin
                clientId = { clientId }
                buttonText = { label }
                onSuccess = { onSuccess }
                onFailure = { onFailure }
                cookiePolicy = { cookiePolicy }
            />
        </div>
    )
}
googleLogin.defaultProps = {
    clientId: '364793091796-4gmbmpe03219871cd8kts3gpdpmiqpih.apps.googleusercontent.com',
    onSuccess: noop,
    onFailure: noop,
    type: 'button',
    cookiePolicy: 'single_host_origin',
    label: 'Continue with Google'
};