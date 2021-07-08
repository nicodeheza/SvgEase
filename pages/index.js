/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import TextBtn from '../components/btns/TextBtn'
import CartBtn from '../components/btns/CartBtn'
import HeaderAnimation from '../components/homeAnimations/HeaderAnimation'
import { useEffect, useState } from 'react'

export default function Home() {
  const[showMenu, setShowMenu]= useState(false);

  useEffect(()=>{
    const root =document.querySelector(':root');
      root.style.setProperty('--vw', window.innerWidth/100 + 'px');
      root.style.setProperty('--vh', window.innerHeight/100 + 'px');

    window.addEventListener('resize',()=>{
      root.style.setProperty('--vw', window.innerWidth/100 + 'px');
      root.style.setProperty('--vh', window.innerHeight/100 + 'px');
    });
  },[]);


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
          <HeaderAnimation />
          <nav className={styles.nav}>
            <ul className={styles.navUl}>
              <li className={styles.navLi}><a href="#">Tienda</a></li>
              <li className={styles.navLi}><a href="#">Acerca de SvgEase</a></li>
              <li className={styles.navLi}><a href="#">Como Comprar</a></li>
            </ul>
          </nav>
          <div style={{height:'300vh', backgroundColor:'white', position:'relative', zIndex:-1}}>
          </div>
    </>
  )
}
