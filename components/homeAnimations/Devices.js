import Lottie from "lottie-web";
import { useEffect } from "react";
import Devices from '../../animations/dispositivos.json'; 

export default function Device(){

    useEffect(()=>{
        Lottie.loadAnimation({
            container: document.getElementById('deviceAnimation'),
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: Devices
        });
    },[]);
    
    return(
        <div id='deviceAnimation' />
    )
}