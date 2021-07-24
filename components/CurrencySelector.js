import styles from '../styles/Tienda.module.css'
export default function CurrencySelector({movil, currency, setCurrency}){

    return(
        <div>
        <select className={movil ? styles.selectMovil : styles.select}
         value={currency} onChange={(e)=>setCurrency(e.target.value)}>
            <option value='ars'>ARS$</option>
            <option value='usa'>USA$</option>
        </select>
        </div>
    )
}