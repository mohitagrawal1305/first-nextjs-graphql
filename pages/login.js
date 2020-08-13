import Head from 'next/head'
import { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { loginMutation, loginUsingGoogleMutation } from '../frontend/services/mutations/login';
import { getUserQuery } from '../frontend/services/query/user';
import { useRouter } from 'next/router';
import { GoogleLogin } from 'react-google-login';


export default function Login() {
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
    <div>
      <Head>
        <title>Login</title>
      </Head>
      
      <form className = 'login-form' onSubmit = { onSubmit } >
          { errorMessage }
          <div className = 'login-form__google' >
          <GoogleLogin
            clientId="364793091796-4gmbmpe03219871cd8kts3gpdpmiqpih.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy={'single_host_origin'}
          />
          </div>
          <input
            name = 'email'
            value = { email }
            type = 'email'
            onChange = { onChange }
            required = { true }
            placeholder = 'Enter Email'
          />
        <input
          name = 'password'
          type = 'password'
          value = { password }
          onChange = { onChange }
          required = { true }
          placeholder = 'Enter Password'
        />
        <button type='submit' >Submit</button>
      </form>
    </div>
  )
}


const googleFailure = ( payload ) => {
  console.log( 'Failure', payload );
};