/* eslint-disable @next/next/no-img-element */
import personajeAnimation from '../../animations/persojane.json'
import fondoAnimation from '../../animations/fondo.json'
import Lottie from 'lottie-web'
import { useEffect } from 'react'
import styles from './headerAnimation.module.css'
import TiendaBtn from '../btns/TiendaBtn'

export default function HeaderAnimation(){


    useEffect(()=>{
        Lottie.loadAnimation({
            container: document.getElementById('fondo'),
            renderer:'svg',
            loop: true, 
            autoplay: true, 
            animationData: fondoAnimation,
            rendererSettings:{
                className: styles.fondo,
                preserveAspectRatio: 'xMidYMax slice'
            }
        });

         Lottie.loadAnimation({
            container: document.getElementById('personaje'),
            renderer: 'svg',
            loop: true, 
            autoplay: true,
            animationData: personajeAnimation,
            rendererSettings:{
                className:styles.personaje,
                preserveAspectRatio: 'xMidYMax meet'
            }
        });

    },[]);

    return(
        <>
        <div className={styles.container}>
            <div id='fondo' className={styles.fondoContainer}/>
            <div id='personaje' className={styles.personajeContainer} />
            <div className={styles.brandContainer}>
                <img src='/svgs/logo.svg' alt='svg ease' width={300} height={300} className={styles.logo}/>
                <p className={styles.epigraph}>Tienda de Animaciones SVG en Lottie para tu Web o App </p>
            </div>
        </div>
            <div className={styles.containerTow}>
            <div className={styles.btnContainer}>
            <TiendaBtn />
            </div>
            </div>
        </>
    )
}