/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import TextBtn from '../components/btns/TextBtn'
import CartBtn from '../components/btns/CartBtn'
import { useState } from 'react'

export default function Home() {
  const[showMenu, setShowMenu]= useState(false);


  return (
    <>
        <Head>
          <title>SvgEase-Home</title>
        </Head>
        <header>
          <div className={styles.headerContainerFirst}>
            <div className={styles.btnContainer}>
              <img src='/svgs/menu.svg' alt='menu' className={styles.menu} onClick={()=>setShowMenu(prev => !prev)}/>
              <img src='/svgs/logo0.svg' alt='Svg Ease' className={styles.topLogo}/>
              <TextBtn text="Iniciar Sesión" icon="login" />
              <TextBtn text="Crear Cuenta" icon="singup" />
            </div>
            <CartBtn />
          </div>
          <div className={showMenu ? styles.movilMenuShow : styles.movilMenuHidden}>
            <TextBtn text="Iniciar Sesión" icon="login" movil={true}/>
            <TextBtn text="Crear Cuenta" icon="singup" movil={true} />
            <a href='#' className={styles.movilMenuA}>Tienda</a>
            <a href ='#' className={styles.movilMenuA}>Acerca de SvgEace</a>
            <a href='#' className={styles.movilMenuA}>Como Compro</a>
          </div>
          
        </header>
    </>
  )
}
