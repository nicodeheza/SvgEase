import Lottie from "lottie-web";
import BoxAnimation from '../../animations/caja.json';
import { useEffect } from "react";

export default function IlusAnimation(){

    useEffect(()=>{
        const animation=Lottie.loadAnimation({
            container: document.getElementById('boxAnimation'),
            renderer: 'svg',
            loop:false,
            autoplay: true,
            animationData: BoxAnimation
        });
        let direction= 1;
        animation.addEventListener('complete', ()=>{
            direction= direction * -1;
            animation.setDirection(direction);
            if(direction === 1){
                setTimeout(()=>{
                    animation.play();
                },1000);
            }else{
                animation.play();
            }
        });

    },[]);


    return(
        <div id='boxAnimation' style={{
            position: 'absolute',
            margin:'auto',
            padding: '10%'
        }}></div>
    )
}