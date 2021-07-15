import CartIcon from "../icons/CartIcon"
import style from './cartBtn.module.css'

export default function CartBtn({setFloatWin}){

    return(
        <div className={style.container} onClick={()=> setFloatWin('cart')}>
            <CartIcon />
            <p className={style.number}>0</p>
        </div>
    )
}