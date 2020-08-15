import Head from 'next/head';
import { login as LoginContainer } from '../frontend/js/components/login';

export default function Login() {
  return (
    <div>
      <Head>
        <title>Login</title>
      </Head>
      <LoginContainer />
      
    </div>
  )
}
