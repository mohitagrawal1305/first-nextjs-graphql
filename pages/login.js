import Head from 'next/head'
import { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { loginMutation } from '../frontend/services/mutations/login';
import { getUserQuery } from '../frontend/services/query/user';
import { useRouter } from 'next/router'

export default function Login() {
  const { client, loading, error, data } = useQuery( getUserQuery );

  const router = useRouter();

  const [ loginUser ] = useMutation( loginMutation );

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
  
      client.resetStore();
      router.push('/');
    }

  };
  return (
    <div>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <form onSubmit = { onSubmit } >
      <label>Email</label>
        <input
          name = 'email'
          value = { email }
          type = 'email'
          onChange = { onChange }
          required = { true }
        />
      <label>Password</label>
        <input
          name = 'password'
          type = 'password'
          value = { password }
          onChange = { onChange }
          required = { true }
        />
        <button type='submit' >Submit</button>
      </form>
      
    </div>
  )
}
