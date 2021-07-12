import Lottie from 'lottie-web';
import { useEffect } from 'react';
import parallax from '../../animations/parallax.json';

export default function ParallaxAnimation(){

    useEffect(()=>{
        const Parallax= Lottie.loadAnimation({
            container: document.getElementById('parallaxAnimation'),
            renderer: 'svg',
            loop: false,
            autoplay: false,
            animationData: parallax
        });
        const limit= 25;
        Parallax.playSegments([0,limit], true);
        let direction= 1;
        Parallax.addEventListener('complete', ()=>{
            direction= direction *-1;
           if(direction === 1){
                   Parallax.playSegments([0,limit], true);
           }else{
                 Parallax.playSegments([limit - 1 , 0], true);
            } 
        });
        Parallax.setSpeed(0.3);
    },[]);

    return(
        <div id="parallaxAnimation" style={{
            position: 'absolute',
            margin: 'auto',
            width: '115%'
        }}></div>
    )
}