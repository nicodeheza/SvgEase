import Lottie from "lottie-web";
import {useRef, useEffect, useState} from 'react'

export default function LoadingAnimation({data, id, pos}){
    const eleRef= useRef();
    const [runGetPos, setRunGetPos]= useState(false)
    let eleWidth=useRef(0);
    let animation= useRef();

    useEffect(()=>{
        if(data){
            animation.current= Lottie.loadAnimation({
                container: document.getElementById(id),
                renderer:'svg',
                loop: true, 
                autoplay: false, 
                animationData: data,
            });
            setRunGetPos(true);
            eleWidth.current= eleRef.current.offsetWidth;
        }
    },[]);

    useEffect(()=>{
        
        if(pos === 0){
             animation.current.play()
        }else{
            animation.current.stop();
        }
    },[pos]);

    function getPos(p){
        if(runGetPos){
             return eleWidth.current * p;      
        }
    }


    return(
        <div style={{
            position: 'absolute',
            left: getPos(pos),
            transition: '1S',
            width: '100%',
            height: '100%',
            display:'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}
        ref={eleRef}
        >
        <div id={id} style={{
            height:'70%',
            marginBottom:'15%'
        }}></div>
        </div>
    )
}