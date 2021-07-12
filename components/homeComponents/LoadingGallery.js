import { useState, useEffect } from 'react';
import LiebreAnimation from '../../animations/liebre.json';
import LoadingText  from '../../animations/loading-text.json';
import SpinnerAnimation from '../../animations/spinner.json'
import LoadingAnimation from '../homeAnimations/LoadingAnimation';

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
                            <LoadingAnimation data={data} id={id} pos={ i - actualAnimation}/>
                        </div>
                        )
                    )
                }
            </div>
            <div style={{
                display:'flex',
                flexDirection: 'row',
                justifyContent:'space-around',
                alignContent:'center',
                position: 'absolute', 
                width: '70%',
                marginBottom: '15%',
                bottom: '0px'
            }}>
                {
                    animations.map(({data, id}, i)=>(
                        <div key={i} onClick={()=> setActualAnimation(i)}  style={{
                            borderRadius:'100%',
                            backgroundColor: i === actualAnimation ? '#729367' : 'white',
                            width: '15px',
                            height : '15px',
                            cursor:'pointer'
                        }}/>
                    ))
                }
            </div>
            <p style={{
                position: 'absolute',
                bottom: '0px',
                right: '0px',
                fontFamily: 'var(--text-font)',
                color: '#729367',
                marginRight:'20px'
            }}>Animaciones de Carga</p>
        </div>
     )

}