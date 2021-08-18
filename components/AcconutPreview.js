import { useEffect } from "react";
import Lottie from "lottie-web";


export default function AccountPreview({file, id, classN}){

    useEffect(()=>{
        
        Lottie.destroy(`accountPreview${id}`);

        Lottie.loadAnimation({
            container: document.getElementById(`accountPreview${id}`),
            renderer: 'svg',
            loop: true,
            autoplay:true, 
            animationData: file,
            name:`accountPreview${id}`,
            rendererSettings:{
                className: classN
            }
        });
    },[file, id, classN]);

    return(
        <div id={`accountPreview${id}`}></div>
    )
}