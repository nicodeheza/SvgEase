import { useEffect, useState } from "react";
import Close from "./icons/Close";
import LoginIcon from "./icons/LoginIcon";
import SingupIcon from "./icons/singupIcon";
import styles from './cart.module.css';
import priceInPesos from "../helpersFunctions/priceInPesos";
import CartPreview from "./CartPreview";
import DropIcon from './icons/DropIcon';
import Lottie from "lottie-web";
import { useAuthContext } from "../contexts/authContext";
import Image from 'next/image';

export default function Cart({setFloatWin, open, store, currency, updateCart, 
    setUpdateCart, usaToArs, cartProducts, setCartProducts, userProducts }){
    const {auth}= useAuthContext();
    const [total, setTotal]=useState(0);
    const [repeat, setRepeat]= useState(checkRepeat());

    useEffect(()=>{
        if(updateCart){

        const localStorage= window.localStorage;

        if(localStorage.getItem('cart')){

            const cart= JSON.parse(localStorage.getItem('cart'));
            setCartProducts(cart);
           // console.log('update effect');
        }
            setUpdateCart(false);
        }
    },[updateCart, setUpdateCart, setCartProducts]);

    useEffect(()=>{
        setRepeat(checkRepeat());
        console.log('oh')
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[cartProducts,userProducts]);

    useEffect(() => {
        let total= 0;
        cartProducts.forEach(ele=>{
            total += ele.price
        });
        if(currency === 'ars'){
            total= priceInPesos( total, usaToArs);
        }
        //console.log('getTotal');
       setTotal(total);
        
    }, [currency, cartProducts, usaToArs]);

    function deleteProduct(id){
        const localStorage= window.localStorage;
        const cart= JSON.parse(localStorage.getItem('cart'));
        const newCart= cart.filter(ele=> ele._id !== id);
        localStorage.setItem('cart', JSON.stringify(newCart));
        Lottie.destroy(`cartPreview${id}`);
        setUpdateCart(true);
    }

    function clearCart(){
        const localStorage= window.localStorage;
        const cart= JSON.parse(localStorage.getItem('cart'));
        localStorage.setItem('cart', JSON.stringify([]));
        cart.forEach(ele=>{
            Lottie.destroy(`cartPreview${ele._id}`);
        });
        setUpdateCart(true);
    }

    function checkRepeat(){
        for(let i= 0; i < cartProducts.length; i++){
            const ele= cartProducts[i];
            if(userProducts?.includes(ele._id)){
                return true;
            }else if( i === cartProducts.length -1){
                return false;
            }
        }
    }


    function mpPay(){
        const mp= new MercadoPago('TEST-b6e0406f-2696-481b-b367-1ac83e93b342', {locale: 'es-AR'});

        let products= [];
        cartProducts.forEach(ele=>{
            const obj={
                id: ele._id,
                title: ele.name,
                unit_price: priceInPesos(ele.price, usaToArs),
                quantity: 1
            }
            products.push(obj);
        });

       // console.log(cartProducts);

        fetch('/api/mp/create_preference',{
            method: 'POST',
            headers:{
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({products})
        })
        .then(res=> res.json())
        .then(data=>{
            mp.checkout({
                preference:{id: data.id},
                autoOpen: true
            });
            
           // console.log(data);
           setFloatWin('none');
           clearCart();
        })
        .catch(err=> console.log(err));
    }


    return(
        <aside className={open && store ? styles.storeCartMainContainer : !open && store ? styles.storeCartMainContainerClose :
             open && !store ? styles.cartMainContainer : styles.cartMainContainerClose}>
            <div className={styles.headerContainer}>
                <h3>Carro de Compras</h3>
                <div onClick={()=>setFloatWin('none')} className={styles.closeContainer}>
                    <Close/>
                </div>
            </div>
            <table className={styles.table}>
                <thead>
                <tr>
                <th>Producto</th>
                <th>Precio</th>
                </tr>
                </thead>
                <tbody>
                {
                    cartProducts.map((product, i)=>(
                        <tr key={i} className={userProducts?.includes(product._id) ? styles.productRepeat : styles.productsTr}>
                        <td className={styles.priceTitle}>
                            <div className={styles.preview}>
                                <CartPreview file={product.file} id={product._id}/>
                            </div>
                            <h5>{product.name}</h5>
                        </td>
                        <td className={styles.priceContainer}>
                            <h5>{`${currency === 'ars' ? priceInPesos(product.price, usaToArs) : product.price}$ ${currency.toUpperCase()}`}</h5>
                        </td>
                        <td>
                            <div onClick={()=>deleteProduct(product._id)}>
                            <DropIcon  classN={styles.dropIcon}/>
                            </div>
                        </td>
                        </tr>
                    ))
                      
                }
                </tbody>
                <tfoot>
                <tr>
                <th>Total:</th>
                <td className={styles.totalPrice}>{`${total}$ ${currency.toUpperCase()}`}</td>
                </tr>
                </tfoot>
            </table>
            {
                !auth ? (
            <div className={styles.btnContainer}>
                <button onClick={()=> setFloatWin('logIn')}>
                    Iniciar Sesión <span><LoginIcon classN={styles.iconBtn}/></span>
                </button>
                <button onClick={()=> setFloatWin('singUp')}>
                    Crear Cuenta <span><SingupIcon classN={styles.iconBtn}/></span>
                </button>
            </div>
                ) : repeat ? (
                    <div className={styles.btnContainer}>
                        <p style={{fontFamily:'var(--text-font)',
                    color:'red',
                    width:'80%'}}>Ya tienes uno o mas productos en tu cuenta, quita los del carro para poder pagar.</p>
                    </div>

                ) : total > 0 ? (
                    <div className={styles.payBtnContainer}>
                        {
                            currency === 'ars' ? (
                                <>
                        <Image src='/svgs/mercadoPago.svg' alt='mercado pago' width={60} height={60} />
                        <button onClick={()=>mpPay()}>
                            Pagar
                        </button>
                                </>
                            ) : (
                                <>
                                <Image src='/svgs/paypal.svg' alt='mercado pago' width={80} height={20} />
                                <button>
                                    Pagar
                                </button>
                                </>
                            )
                        }
                    </div>
                ) : (
                    <div className={styles.btnContainer}>
                        <p style={{fontFamily:'var(--text-font)',
                    color:'red'}}>Carro vacío</p>
                    </div>
                )
            }
        </aside>
    )
}