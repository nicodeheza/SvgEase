/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import Close from "./icons/Close";
import priceInPesos from "../helpersFunctions/priceInPesos";
import Lottie from "lottie-web";
import styles from './preview.module.css';

const colors=['#ffffff', '#ededed', '#000000', '#f46c6c', '#5cf75c', '#6c7aff'];

export default function Preview({product, setPreviewProduct, currency, usaToArs, store, setEdit, setUpdateCart, cartProducts}){

    const[bkColor, setBkColor]= useState(colors[1]);
    const[play, setPlay]= useState(true);
    const [activeBtn, setActiveBtn]= useState(false);

    const  animation= useRef(null);

    useEffect(()=>{

         animation.current= Lottie.loadAnimation({
            container: document.getElementById(`productPreviewAnimation${product._id}`),
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: product.file,
            name: `productPreviewAnimation${product._id}`
        });


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
      }
    },[cartProducts, product, store]);

    useEffect(()=>{
        if(play){
            animation.current.play();
        }else{
            animation.current.pause();
        }
    },[play]);

    function close(){
        setPreviewProduct(null);
        Lottie.destroy(`productPreviewAnimation${product._id}`);
    }

    function addToCart(){
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
            setActiveBtn(true);
        }else{
            const cart= JSON.parse(localStorage.getItem('cart'));
            localStorage.setItem('cart', JSON.stringify(cart.filter(ele=> ele._id !== product._id)));
            setActiveBtn(false)
        }
        setUpdateCart(true);
    }

    function addEdit(){
        setEdit(product);
        close();
    }

    return(
        <div className={styles.mainContainer}>
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>{product.name}</h1>
                <div onClick={()=> close()}><Close classN={styles.close} /></div>
            </div>
            <div style={{backgroundColor: bkColor}} className={styles.animationContainer}>
                <div id={`productPreviewAnimation${product._id}`} className={styles.animation} />
            </div>
            <div className={styles.playContainer}>
                <img src={ !play ? '/svgs/play.svg' : '/svgs/pause.svg'} alt={play ? 'play' : 'pause'}
                 onClick={()=>setPlay(prev=> !prev)} />
            </div>
            <div className={styles.colorCategories}>
                <div>
                    <h5>Color de Fondo:</h5>
                    <div className={styles.colorContainer}>
                    {
                        colors.map((color, i)=>(
                            <div key={i}
                            className={styles.color}
                             style={{backgroundColor: color}}
                             onClick={()=>setBkColor(color)} > </div>
                        ))
                    }
                    </div>
                </div>
                <div className={styles.categoriesContainer}>
                    <h4>Categorías:</h4>
                    <ul>
                        <li>{`#${product.category}, `}</li>
                        {
                            product.tags.map((tag, i)=>{
                                if(i === product.tags.length - 1){
                                    return(
                                        <li key={i}>{`#${tag}`}</li>
                                    )
                                }else{
                                    return(
                                        <li key={i}>{`#${tag}, `}</li>
                                    )
                                }
                            })
                        }
                    </ul>
                </div>
            </div>

            <div className={styles.priceBtn}>
                <p>{`${currency === 'ars' ? priceInPesos(product.price, usaToArs) : product.price}$ ${currency.toUpperCase()}`}</p>
                <button onClick={()=> store ? addToCart() : addEdit()}
                style={activeBtn && store ? {backgroundColor:'#89d3a7'} : {}}>
                {
                   store && !activeBtn ? 'Agregar' : store && activeBtn ? 'Agregado':
                   !store && !activeBtn ? 'Editar' : 'Editar' 
                }
            </button> 
            </div>
        </div>
        </div>
    )
}