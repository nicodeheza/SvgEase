import { useEffect, useState } from "react"
import Lottie from "lottie-web";
import styles from './productCard.module.css';


export default function ProductCard({product, currency, store, key}){

   // const [activeBtn, setActiveBtn]= useState(false);

    // useEffect(()=>{
    //     Lottie.loadAnimation({
    //         container: document.getElementById(`cardAnimation${product._id}`),
    //         renderer: 'svg',
    //         loop: true,
    //         autoplay: true,
    //         animationData: require(`../productsFiles/${product._id}`)
    //     });
    // },[]);

    return(

      <div className={styles.mainContainer} key={key}>
           {/* 
            <div>
                <div id={`cardAnimation${product._id}`}/>
            </div>
            <h2>{product.name}</h2>
            <div>
                <h3>Categorías:</h3>
                <ul>
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
            <div>
            <p>{`${product.price}$ ${currency}`}</p>
            <button onClick={()=> setActiveBtn(prev=> !prev)}>
                {
                   store && !activeBtn ? 'Agregar' : store && activeBtn ? 'Agregado':
                   !store && !activeBtn ? 'Editar' : 'Editar' 
                }
            </button>
            </div>
*/}
            </div>
    )

}