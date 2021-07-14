import Link from 'next/link'
import styles from './tiendaBtn.module.css' 

export default function TiendaBtn(){
    
    return(
        <div className={styles.btn}>
        <Link href='/tienda'>
            <a className={styles.btnA}>Ir a la Tienda</a>
        </Link>
        </div>
    )
}