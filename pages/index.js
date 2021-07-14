/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import TextBtn from '../components/btns/TextBtn';
import CartBtn from '../components/btns/CartBtn';
import IconGallery from '../components/homeComponents/IconsGallery';
import ParallaxAnimation from '../components/homeAnimations/ParallaxAnimation';
import HeaderAnimation from '../components/homeAnimations/HeaderAnimation';
import IlusAnimation from '../components/homeAnimations/IlusAnimation';
import LluviaAnimation from '../components/homeAnimations/LluviaAniation';
import LoadingGallery from '../components/homeComponents/LoadingGallery';
import Interactive from '../components/homeComponents/Interactive';
import TiendaBtn from '../components/btns/TiendaBtn';
import Device from '../components/homeAnimations/Devices';
import { useEffect, useState } from 'react'

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
          <HeaderAnimation />
          <nav className={styles.nav}>
            <ul className={styles.navUl}>
              <li className={styles.navLi}><a href="#">Tienda</a></li>
              <li className={styles.navLi}><a href="#">Acerca de SvgEase</a></li>
              <li className={styles.navLi}><a href="#">Como Comprar</a></li>
            </ul>
          </nav>
          <main>
            <section className={styles.gallery}>
              <div className={styles.titleGalleryContainer}>
                <h1 className={styles.galleryTitle}>Todo tipo de animaciones</h1>
                <div className={styles.galleryContainer}>
                <div className={styles.parallax}>
                  <ParallaxAnimation />
                  <p className={styles.parallaxTitle}>Parallax</p>
                </div>
                <div className={styles.icons}>
                  <IconGallery />
                </div>
                <div className={styles.illustrations}>
                  <IlusAnimation />
                  <p className={styles.ilusTitle}>Ilustraciones</p>
                </div>
                <div className={styles.cards}>
                  <LluviaAnimation />
                  <p className={styles.cardsTitle}>Tarjetas</p>
                  <img src='/svgs/clima.svg' alt='image'  className={styles.climaImg}/>
                </div>
                <div className={styles.load}>
                  <LoadingGallery />
                </div>
              </div>
              <div className={styles.galleryBtn}>
              <TiendaBtn/>
              </div>
              </div>
            </section>

              <Interactive />

            <section className={styles.deviceContainer}>
              <div className={styles.deviceAnimationContainer}>
              <Device/>
              </div>
              <h1>Multiplatafoma y faciles de implementar</h1>
              <p>Nuestas animaciones estan hechas con Lotti una tecnologia compatible con web, 
                andorid y ios muy fácil de implementar en tus proyectos. <br/> Mas info <a href='#' className={styles.lottieLink}>aquí.</a> 
                <span><TiendaBtn /></span>
                </p>
            </section>

            <section className={styles.helpSection}>
              <h1>¿Como Comprar?</h1>
              <ul>
                <li>Agrega las animaciones que quieras en el carro</li>
                <li>Una vez que hayas seleccionado todas las animaciones que quieras anda al carro</li>
                <li>Logueate o registrate si todavia no lo hiciste</li>
                <li>Elegi tu medio de pago</li>
                <li>Las animaciones quedan gurdadas en en tu perfil para que las descargues cuando y las veces que quieras</li>
              </ul>
              <div className={styles.helpBtnContainer}>
                <TiendaBtn />
              </div>
              <img src='/img/tuto-temp.png' alt='video ayuda' />
            </section> 
          </main>
          <footer className={styles.footer}>
            <ul>
              <li><a href="#">Tienda</a></li>
              <li><a href="#">Acerca de SvgEase</a></li>
              <li><a href="#">Como Comprar</a></li>
            </ul>
            <img src="/svgs/logo.svg" alt="Svg Ease" />
          </footer>
    </>
  )
}
