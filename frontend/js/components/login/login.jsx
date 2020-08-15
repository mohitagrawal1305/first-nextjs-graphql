import { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { loginMutation, loginUsingGoogleMutation } from 'mutations/login';//'../frontend/services/mutations/login';
import { getUserQuery } from 'query/user';
import { useRouter } from 'next/router';
import { inputField as InputField } from 'modules/input-field'
import { button as Button } from 'modules/button'
import { error as Error } from 'modules/error';
import { googleLogin as GoogleLogin } from 'modules/google-login'

export const login = props => {

    const { client, loading, error, data } = useQuery( getUserQuery );

    const router = useRouter();

    const [ loginUser ] = useMutation( loginMutation );
    const [ loginUsingGoogle ] = useMutation( loginUsingGoogleMutation );

    useEffect( () => {
        const token = localStorage.getItem('token');
        if( token ) {
        router.push('/');
        }
    }, [] );

    const [ formData, setFormData ] = useState( {
        email: '',
        password: ''
    } );
    const [ errorMessage, setErrorMessage ] = useState( '' );
    const {
        email,
        password
    } = formData;

    const onChange = ( e ) => {
        setFormData( {
        ...formData,
        [ e.target.name ]: e.target.value
        } );
    };

    const onSubmit = async ( e ) => {
        e.preventDefault();
        const { data } = await loginUser( {
        variables: formData
        } );
        const token = data.login.token;

        if( token ) {

        localStorage.setItem( 'token', token );
        localStorage.setItem( 'isUserLoggedIn', true );
    
        client.resetStore();
        router.push('/');
        }

    };

    const googleSuccess = async ( payload ) => {
        const { data } = await loginUsingGoogle( {
            variables: {
            email: payload.profileObj.email
            }
        } );
        const { token, msg } = data.loginUsingGoogle;

        if( token ) {

            localStorage.setItem( 'token', token );
            localStorage.setItem( 'isUserLoggedIn', true );
        
            client.resetStore();
            router.push('/');
        } else {
            setErrorMessage( msg );
        }

    };
    return (
      <div className = 'login' >

        <form className = 'login-form' onSubmit = { onSubmit } >
          
          <GoogleLogin
            clientId = "364793091796-4gmbmpe03219871cd8kts3gpdpmiqpih.apps.googleusercontent.com"
            label = "Continue with Google"
            onSuccess = { googleSuccess }
            onFailure = { googleFailure }
            cookiePolicy = { 'single_host_origin' }
          />
          <InputField
            name = 'email'
            value = { email }
            type = 'email'
            onChange = { onChange }
            required = { true }
            placeholder = 'Enter Email'
          />
          <InputField
            name = 'password'
            type = 'password'
            value = { password }
            onChange = { onChange }
            required = { true }
            placeholder = 'Enter Password'
          />
          <Error
            msg = { errorMessage }
          />
          
          <Button type='submit' >
            Submit
          </Button>
        </form>
      </div>
    )
}

const googleFailure = ( payload ) => {
    console.log( 'Failure', payload );
  };



