import Lottie from "lottie-web";
import { useEffect, useRef, useState } from "react";
import FlowerAnimation from '../../animations/flor.json';
import styles from '../homeComponents/interactive.module.css'

export default function Flower({color}){
    //const [hover, setHover]= useState('none')
    const hover= useRef(false);

    useEffect(()=>{
        const flower=Lottie.loadAnimation({
            container: document.getElementById('flowerAnimation'),
            renderer: 'svg',
            loop: false,
            autoplay: false,
            animationData: FlowerAnimation
        });
        flower.playSegments([0,40], true);
        let prev;
        flower.addEventListener('complete',()=>{
            if(hover.current){
                if(prev){
                    flower.playSegments([50,51], true);
                }else{
                    flower.playSegments([41,59], true);
                }
            }else{
                flower.playSegments([0,40], true);
            }

            prev= hover.current;
        });
    },[]);

    useEffect(()=>{
        const petalos= document.getElementById('flor-petalos');
        const petalosChild= petalos.children
       for(let ele of petalosChild ){
           ele.children[0].style.fill=color
       }
    },[color]);

    return(
        <div className={styles.animationContainer}>
          <div className={styles.backgroundContainer}>
        <div className={styles.background}/>
        </div>
        <div className={styles.flowerContainer}>
        <div id="flowerAnimation"  className={styles.flower}
        onMouseEnter={()=>hover.current= true} 
        onMouseLeave={()=> hover.current= false}
            />
        </div>
        </div>
    )
}