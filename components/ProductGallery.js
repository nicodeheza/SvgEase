import ProductCard from "./productCard"
import styles from './productGallery.module.css'

export default function ProductGallery({products, store}){

    return(
        <div className={styles.container}>
        {
            products.map((product)=>(
                <ProductCard product={product} currency={'USA'} store={store} key={product._id}/>
            ))
        }
        </div>
    )
}