import Head from 'next/head';
import { login as LoginContainer } from '../frontend/js/components/login';
import { Fragment } from 'react';
import { auth } from '../backend/utils/auth';

function Login() {

  return (
    <Fragment>
      <Head>
        <title>Login</title>
      </Head>
      <LoginContainer />
    </Fragment>
  )
}

Login.getInitialProps = async (ctx) => {
  const token = auth( { ctx, isPrivateRoute: false } );
  return {
    token
  };
};

export default Login;