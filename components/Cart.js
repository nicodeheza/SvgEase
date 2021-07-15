import { useState } from "react";
import Close from "./icons/Close";
import LoginIcon from "./icons/LoginIcon";
import SingupIcon from "./icons/singupIcon";
import styles from './cart.module.css';

export default function Cart({setFloatWin, open }){
    const [cartProducts, setCartProducts]=([]);
    const [total, setTotal]=useState(0);
    const[currency, setCurrency]= useState('');

    return(
        <aside className={open ? styles.cartMainContainer : styles.cartMainContainerClose}>
            <div className={styles.headerContainer}>
                <h3>Carro de Compras</h3>
                <div onClick={()=>setFloatWin('none')} className={styles.closeContainer}>
                    <Close/>
                </div>
            </div>
            <div className={styles.table}>
                <p className={styles.label}>Producto</p><p className={styles.label}>Precio</p>
                <div className={styles.tempProductsContainer}></div>
                <p className={styles.total}>Total:</p><p className={styles.total}>{`${total}$ ${currency}`}</p>
                {
                    !cartProducts ?
                    (<p className={styles.empty}>El Carro esta vacío</p>) : (null)
                }
            </div>
            <div className={styles.btnContainer}>
                <button>
                    Iniciar Sesión <span><LoginIcon classN={styles.iconBtn}/></span>
                </button>
                <button>
                    Crear Cuenta <span><SingupIcon classN={styles.iconBtn}/></span>
                </button>
            </div>
        </aside>
    )
}