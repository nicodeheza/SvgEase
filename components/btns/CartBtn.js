import CartIcon from "../icons/CartIcon"
import style from './cartBtn.module.css'

export default function CartBtn(){

    return(
        <div className={style.container}>
            <CartIcon />
            <p className={style.number}>0</p>
        </div>
    )
}