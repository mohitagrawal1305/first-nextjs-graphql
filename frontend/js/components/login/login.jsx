import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { loginMutation, loginUsingGoogleMutation } from 'mutations/login';
import { useRouter } from 'next/router';
import { inputField as InputField } from 'modules/input-field'
import { button as Button } from 'modules/button'
import { googleLogin as GoogleLogin } from 'modules/google-login';
import { CircularProgress } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useApolloClient } from '@apollo/client';
import { isEmpty } from 'lodash';
import { textLink as TextLink } from 'modules/text-link';

export const login = () => {

    const  client = useApolloClient();

    const router = useRouter();

    const [ loginUser, { loading: isSubmittingloginFromData } ] = useMutation( loginMutation );
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

        setErrorMessage( '' );
    };

    const onSubmit = async ( e ) => {
        
      e.preventDefault();
        
      const { data } = await loginUser( {
        variables: formData
      } );
      
      const { token, msg } = data.login;

      if( token ) {

        localStorage.setItem( 'token', token );
        localStorage.setItem( 'isUserLoggedIn', true );
    
        client.resetStore();
        router.push('/');
        } else {
          setErrorMessage( msg );
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
          {
            !isEmpty( errorMessage ) && (
              <Alert severity="error">
                { errorMessage }
              </Alert>
            )
          }

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

          <TextLink href = '/forgot-password' label="Forgot Password?" />
          
          <Button type='submit' >
            {
              isSubmittingloginFromData ? (
                <CircularProgress size = { 25 } />
              ) : `Submit`
            }
          </Button>

          <div className='login__registration' >
              <p className='login__registration__title' >Don't have an Account?</p>
              <TextLink href = '/registration' label="Register Now" />
          </div>
        </form>

      </div>
    )
}

const googleFailure = ( payload ) => {
    console.log( 'Failure', payload );
  };



