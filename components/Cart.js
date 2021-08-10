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

export default function Cart({setFloatWin, open, store, currency, updateCart, 
    setUpdateCart, usaToArs, cartProducts, setCartProducts }){
    const {auth}= useAuthContext();
    const [total, setTotal]=useState(0);

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
                        <tr key={i} className={styles.productsTr}>
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
                ) : total > 0 ? (
                    <div className={styles.btnContainer}>
                        <button>Paga</button>
                    </div>
                ) : (
                    <div className={styles.btnContainer}>
                        <p>Carro vacío</p>
                    </div>
                )
            }
        </aside>
    )
}