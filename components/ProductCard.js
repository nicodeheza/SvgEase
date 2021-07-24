import { useEffect, useState } from "react"
import Lottie from "lottie-web";
import styles from './productCard.module.css';
import priceInPesos from "../helpersFunctions/priceInPesos";


export default function ProductCard({product, currency, store, usaToArs }){

   const [activeBtn, setActiveBtn]= useState(false);

    useEffect(()=>{
        Lottie.loadAnimation({
            container: document.getElementById(`cardAnimation${product._id}`),
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: require(`../productsFiles/${product._id}`)
        });
    },[product._id]);


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
            <button onClick={()=> setActiveBtn(prev=> !prev)}>
                {
                   store && !activeBtn ? 'Agregar' : store && activeBtn ? 'Agregado':
                   !store && !activeBtn ? 'Editar' : 'Editar' 
                }
            </button>
            </div>

            </div>
    )

}