import { useEffect, useState } from "react"
import Lottie from "lottie-web";
import styles from './productCard.module.css';
import priceInPesos from "../helpersFunctions/priceInPesos";


export default function ProductCard({product, currency, store, usaToArs, setEdit, edit }){

   const [activeBtn, setActiveBtn]= useState(false);

    useEffect(()=>{
        Lottie.destroy(product._id);
        const animation= product.file;
        if(animation){
            Lottie.loadAnimation({
                container: document.getElementById(`cardAnimation${product._id}`),
                renderer: 'svg',
                loop: true,
                autoplay: true,
                name: product._id,
                animationData: animation
            });
          }
    },[product]);


    function btnClick(){
        setActiveBtn(prev=> !prev);
        if(!store){
            setEdit(product);
        }
    }


    return(

      <div className={styles.mainContainer}>
            
            <div className={styles.previewContainer}>
                <div id={`cardAnimation${product._id}`} className={styles.animation}/>
            </div>
            <h2>{product.name}</h2>
            <div>
                <h3>Categorías:</h3>
                <ul>
                    <li>{`#${product.category}, `}</li>
                    {
                        product.tags.map((tag,i)=>{
                            if(i === product.tags.length -1){
                                return(<li key={i}>{`#${tag}`}</li>)
                            }else{
                                return(<li key={i}>{`#${tag}, `}</li>)
                            }
                        })
                    }
                </ul>
            </div>
            <div className={styles.priceBtn}>
            <p>{`${currency === 'ars' ? priceInPesos(product.price, usaToArs) : product.price}$ ${currency.toUpperCase()}`}</p>
            <button onClick={()=> btnClick()} 
            style={product._id === edit._id ? {backgroundColor: '#89d3a7'} : {}} >
                {
                   store && !activeBtn ? 'Agregar' : store && activeBtn ? 'Agregado':
                   !store && !activeBtn ? 'Editar' : 'Editar' 
                }
            </button>
            </div>

            </div>
    )
}