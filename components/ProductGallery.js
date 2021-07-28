import ProductCard from "./productCard"
import styles from './productGallery.module.css'

export default function ProductGallery({products, store, currency, usaToArs, setEdit, edit}){

    return(
        <div className={styles.container}>
        {
            products.map((product)=>{
                if(product._id){
                    return(
                    <ProductCard product={product} currency={currency} 
                    store={store} key={product._id} usaToArs={usaToArs}
                    setEdit={setEdit} edit={edit} />
                    )
                }
            }
            )
        }
        </div>
    )
}