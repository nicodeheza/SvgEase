import '../styles/globals.css';
import Head from 'next/head';
import {AuthContextProv} from '../contexts/authContext';

function MyApp({ Component, pageProps }) {
  return (
    <>
    <Head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
    </Head>
    <AuthContextProv>
      <Component {...pageProps} />
    </AuthContextProv>
  </>
  )
}

export default MyApp
