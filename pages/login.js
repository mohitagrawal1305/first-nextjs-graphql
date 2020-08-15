import Head from 'next/head';
import { login as LoginContainer } from '../frontend/js/components/login';
import { Fragment } from 'react';

export default function Login() {

  return (
    <Fragment>
      <Head>
        <title>Login</title>
      </Head>
      <LoginContainer />
    </Fragment>
  )
}
