import { useEffect, useState } from "react"
import Lottie from "lottie-web";
import styles from './productCard.module.css';
import priceInPesos from "../helpersFunctions/priceInPesos";


export default function ProductCard({product, currency, store, usaToArs, setEdit, 
    edit, setPreviewProduct, setUpdateCart, cartProducts }){

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

          //product selected update
          if(store){
          const localStorage= window.localStorage;
          const cart= JSON.parse(localStorage.getItem('cart'));
          if(cart){
              if(cart.find(ele=> ele._id === product._id) !== undefined){
                  setActiveBtn(true);
              }
          }
         }

    },[product, store]);

    useEffect(()=>{
        if(store){
        const ele= cartProducts.find(ele=> ele._id === product._id);
        if(ele === undefined){
            setActiveBtn(false);
        }else{
            setActiveBtn(true);
        }
       // console.log(ele);
      }
    },[cartProducts, product, store]);


    function btnClick(){
        setActiveBtn(prev=> !prev);
        if(!store){
            setEdit(product);
        }else{
            const localStorage= window.localStorage;
            if(!activeBtn){
                const productToAdd={
                    name: product.name,
                    price: product.price,
                    file: product.file,
                    _id: product._id
                }

                if(localStorage.getItem('cart')){
                    const cart= JSON.parse(localStorage.getItem('cart'));
                    cart.push(productToAdd);
                    localStorage.setItem('cart', JSON.stringify(cart));
                }else{
                    const cart= [productToAdd];
                    localStorage.setItem('cart', JSON.stringify(cart));
                }
            }else{
                const cart= JSON.parse(localStorage.getItem('cart'));
                localStorage.setItem('cart', JSON.stringify(cart.filter(ele=> ele._id !== product._id)));
            }
            setUpdateCart(true);
           // console.log(JSON.parse(localStorage.getItem('cart')).length);
        }
    }


    return(

      <div className={styles.mainContainer}>
            
            <div className={styles.previewContainer} onClick={()=> setPreviewProduct(product)}>
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
            {
                store ? 
                (
                    <button onClick={()=> btnClick()}
                    style={activeBtn ? {backgroundColor: '#89d3a7'} : {}}>
                        {!activeBtn ? 'Agregar' : 'Agregado'}
                    </button>
                ):
                (
                    <button onClick={()=> btnClick()}
                    style={edit !== undefined && product._id === edit._id ? {backgroundColor: '#89d3a7'} : {}} >
                        Editar
                    </button>
                )
            }
            </div>

            </div>
    )
}