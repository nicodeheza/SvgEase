import { useState, useEffect } from 'react';
import LiebreAnimation from '../../animations/liebre.json';
import LoadingText  from '../../animations/loading-text.json';
import SpinnerAnimation from '../../animations/spinner.json'
import LoadingAnimation from '../homeAnimations/LoadingAnimation';
import styles from '../../styles/Home.module.css'

const animations=[{data: LiebreAnimation, id:'liebreAnima'},
{data:LoadingText, id:'loadingText'},
{data:SpinnerAnimation, id:'SpinnerAnima'}];


export default function LoadingGallery(){
    const [actualAnimation, setActualAnimation]=useState(0);

    useEffect(()=>{
        const interval= setInterval(()=> {
            setActualAnimation(pev=> (pev + 1) % (animations.length));
         },5000);
         return()=>clearInterval(interval)

     },[actualAnimation]);

     return(

        <div style={{
            position: 'relative' ,
            height: '100%',
            display: 'flex',
            justifyContent: 'center'
        }}>
            <div>
                {
                     animations.map(({data, id},i)=>(
                        <div key ={i}>
                            <LoadingAnimation data={data} id={id} pos={ i - actualAnimation}/>
                        </div>
                        )
                    )
                }
            </div>
            <div className={styles.iconsBtnsContainer}>
                {
                    animations.map(({data, id}, i)=>(
                        <div key={i} onClick={()=> setActualAnimation(i)}  style={{
                            backgroundColor: i === actualAnimation ? '#729367' : 'white',
                        }} className={styles.iconsBtns}/>
                    ))
                }
            </div>
            <p className={styles.loadTitle}>Animaciones de Carga</p>
        </div>
     )

}