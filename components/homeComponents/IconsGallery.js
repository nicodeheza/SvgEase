import { useEffect, useRef, useState } from 'react';
import animaChat from '../../animations/chat.json';
import animaDownload from '../../animations/download.json';
import animaEmail from '../../animations/email.json';
import animaHome from '../../animations/home.json';
import animaDelete  from '../../animations/trash.json';
import IconAnimation from '../homeAnimations/IconAnimation';
import styles from '../../styles/Home.module.css'

const animations= [{ data: animaChat, id: 'chat'},
 {data:animaDownload, id:'download'},
 {data: animaEmail, id: 'email'}, 
 {data: animaHome, id:'home'},
 {data:animaDelete, id: 'delete'}];

export default function IconGallery(){
    const [actualAnimation, setActualAnimation]= useState(0);

        useEffect(()=>{
           const interval= setInterval(()=> {
               setActualAnimation(pev=> (pev + 1) % (animations.length  ));
            },5000);
            return()=>clearInterval(interval)

        },[]);

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
                        <IconAnimation data={data} id={id} pos={ i - actualAnimation}/>
                    </div>
                    )
                )
            }
            </div>
            <div className={styles.iconsBtnsContainer}>
                {
                    animations.map(({data, id}, i)=>(
                        <div key={i} onClick={()=> setActualAnimation(i)}  style={{
                            backgroundColor: i === actualAnimation ? '#ff8080' : 'white'
                        }} className={styles.iconsBtns}/>
                    ))
                }
            </div>
            <p className={styles.iconsTitle}>Iconos y Botones</p>
        </div>
    )
}