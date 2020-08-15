import Head from 'next/head'
import { home as HomeComponent } from '../frontend/js/components/home'
import { header as HeaderComponent } from '../frontend/js/components/header'

export default function Home() {
  
  return (
    <div >
      <Head>
        <title>Welcome to e-Commerce</title>
      </Head>
      <HeaderComponent />
      <HomeComponent />
    </div>
  )
}
