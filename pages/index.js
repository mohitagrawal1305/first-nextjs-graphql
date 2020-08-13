import Head from 'next/head'
import styles from '../frontend/styles/Home.module.css'
import { useQuery } from '@apollo/client';
import { getUserQuery } from '../frontend/services/query/user';
import { get } from 'lodash';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const [ isUserLoggedIn, setUserLoggedIn ] = useState( false );
  const { client, loading, error, data } = useQuery( getUserQuery );
  const name = get( data, 'user.name', `to e-Commerce` );
  
  useEffect( () => {
    const token = localStorage.getItem('token');
    if( token ) {
      setUserLoggedIn( true );
    }
  }, [] );
  return (
    <div className={styles.container}>
      <Head>
        <title>Welcome to e-Commerce</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome <span
            dangerouslySetInnerHTML = { {
                __html: name
            } }
          />
        </h1>
        {
          !isUserLoggedIn ? (
            <Link href="/login">
              <a>login</a>
            </Link>
          ) : (
            <button
              onClick = { () => {
                localStorage.removeItem("token");
                client.resetStore();
                setUserLoggedIn( false );
              } }
            >
              Logout
            </button>
          )
        }
        
        </main>
    </div>
  )
}
