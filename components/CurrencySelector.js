import styles from '../styles/Tienda.module.css'
export default function CurrencySelector({movil}){

    return(
        <div>
        <select className={movil ? styles.selectMovil : styles.select}>
            <option value='ars'>ARS$</option>
            <option value='usa'>USA$</option>
        </select>
        </div>
    )
}