import { useState, useContext } from 'react';
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
import { globalContext } from '../../store';
import { ACTIONS } from '../../store/reducer';

export const login = ( props ) => {

    const { dispatch } = useContext( globalContext );

    const  client = useApolloClient();

    const router = useRouter();

    const [ loginUser, { loading: isSubmittingloginFromData } ] = useMutation( loginMutation );
    const [ loginUsingGoogle, { loading: isSubmittingloginUsingGoogle } ] = useMutation( loginUsingGoogleMutation );

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

        document.cookie = `token=${token}; path=/`;
    
        client.resetStore();

        dispatch( ACTIONS.SET_USER_LOGGED_IN );
        
        if( props.loginSuccess ) {
          props.loginSuccess();
        } else {
          router.push('/');
        }
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

            document.cookie = `token=${token}; path=/`;

            client.resetStore();
            dispatch( ACTIONS.SET_USER_LOGGED_IN );
            if( props.loginSuccess ) {
              props.loginSuccess();
            } else {
              router.push('/');
            }
        } else {
            setErrorMessage( msg );
        }

    };

    const googleFailure = () => {
      setErrorMessage( 'Login Failed, Please try again.' );
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

          <TextLink href = '/forgot-password' label="Forgot Password?" />

          {
            !isEmpty( errorMessage ) && (
              <Alert severity="error">
                { errorMessage }
              </Alert>
            )
          }
          
          <Button type='submit' >
            {
              isSubmittingloginFromData || isSubmittingloginUsingGoogle ? (
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

