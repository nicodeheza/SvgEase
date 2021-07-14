import { useState } from "react";
import TiendaBtn from "../btns/TiendaBtn";
import Flower from "../homeAnimations/Flower";
import styles from './interactive.module.css'

const colors=['#f94b58','#f3f74d', '#4d9ff7', '#8f4df7', '#f983ff' ];

export default function Interactive(){
    const [actualColor, setActualColor]= useState(colors[0]);

    return(
        <section className={styles.interContainer}>
            <div className={styles.titleContainer}>
            <h1 className={styles.title}>Editables y compatibles con interactividad</h1>
            </div>
            <div className={styles.colorPickerContainer}>
                {
                    colors.map((color, i)=>(
                        <div style={{ backgroundColor: color}} className={styles.colorPicker} key={i}
                        onClick={()=>setActualColor(color)} />
                    ))
                }
          
            </div>
            <div className={styles.btnContainer}>
            <TiendaBtn />
            </div>
        <Flower color={actualColor}/>
        </ section>
    )
}