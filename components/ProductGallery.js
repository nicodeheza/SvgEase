import ProductCard from "./productCard"
import styles from './productGallery.module.css'

export default function ProductGallery({products, store, currency, usaToArs}){

    return(
        <div className={styles.container}>
        {
            products.map((product)=>(
                <ProductCard product={product} currency={currency} 
                store={store} key={product._id} usaToArs={usaToArs}/>
            ))
        }
        </div>
    )
}