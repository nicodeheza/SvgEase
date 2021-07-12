import Lottie from "lottie-web";
import { useEffect } from "react";
import lluviaAnima from '../../animations/lluvia.json';

export default function LluviaAnimation(){

    useEffect(()=>{
        Lottie.loadAnimation({
            container: document.getElementById('lluviaAnima'),
            renderer:'svg',
            loop: true,
            autoplay: true,
            animationData: lluviaAnima
        });
    },[]);

    return(
        <div id='lluviaAnima' style={{
            position: 'absolute',
            top: '0px',
            left: '0px',
            margin: 'auto',
            width: '110%'
        }} />
    )
} 