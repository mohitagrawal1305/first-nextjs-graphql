import Head from 'next/head'
import { home as HomeComponent } from '../frontend/js/components/home'
import { header as HeaderComponent } from '../frontend/js/components/header'
import { Fragment } from 'react'

export default function Home() {
  
  return (
    <Fragment >
      <Head>
        <title>Welcome to e-Commerce</title>
      </Head>
      <HeaderComponent />
      <div className = 'page-with-header' >
        <HomeComponent />
      </div>
    </Fragment>
  )
}
