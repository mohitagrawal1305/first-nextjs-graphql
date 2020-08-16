import Head from 'next/head';
import { Fragment } from 'react';
import { auth } from '../backend/utils/auth';
import { registration as RegistrationComponent } from '../frontend/js/components/registration';

export default function Registration() {

  return (
    <Fragment>
      <Head>
        <title>Registration</title>
      </Head>
      <RegistrationComponent />
    </Fragment>
  )
}

Registration.getInitialProps = async (ctx) => {
  const token = auth( { ctx, isPrivateRoute: false } );
  return {
    token
  };
};