import CartIcon from "../icons/CartIcon"
import style from './cartBtn.module.css'

export default function CartBtn({floatWin, setFloatWin, number}){
    return(
        <div className={style.container} onClick={()=>floatWin === 'cart' ? setFloatWin('none') :  setFloatWin('cart')}>
            <CartIcon />
            <p className={style.number}>{number}</p>
        </div>
    )
}