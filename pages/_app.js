import '../styles/globals.css';
import Head from 'next/head';
import {AuthContextProv} from '../contexts/authContext';
import { useState } from 'react';

function MyApp({ Component, pageProps }) {
  const [currency, setCurrency]= useState('ars');
  return (
    <>
    <Head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
    </Head>
    <AuthContextProv>
      <Component {...pageProps} currency={currency} setCurrency={setCurrency} />
    </AuthContextProv>
  </>
  )
}

export default MyApp
