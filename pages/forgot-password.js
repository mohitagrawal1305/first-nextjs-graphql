import Head from 'next/head';
import { Fragment } from 'react';
import { auth } from '../backend/utils/auth';
import { forgotPassword as ForgotPasswordComponent } from '../frontend/js/components/forgotPassword'

export default function ForgotPassword() {

  return (
    <Fragment>
      <Head>
        <title>Forgot Password</title>
      </Head>
      <ForgotPasswordComponent />
    </Fragment>
  )
}

ForgotPassword.getInitialProps = async (ctx) => {
  const token = auth( { ctx, isPrivateRoute: false } );
  return {
    token
  };
};