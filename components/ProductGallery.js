import ProductCard from "./productCard";
import styles from './productGallery.module.css';
import Link from 'next/link';
import Preview from "./Preview";
import { useEffect, useState } from "react";
import {useRouter} from 'next/router';

export default function ProductGallery({products, store, currency, usaToArs, 
    setEdit, edit, numOfDocuments, setUpdateCart, cartProducts}){

    const [componentMount, setComponentMount]=useState(false);
    const [actualPage, setActualPage]= useState(1);
    const [previewProduct, setPreviewProduct]= useState(null);

    const numOfPages= Math.ceil(numOfDocuments /12);
    
    function index(){
        
        let arr=[];
       
         const first= actualPage - 2 > 0 ? actualPage -2 : actualPage -1 > 0 ? actualPage-1 : actualPage;
         const last= actualPage +2 <= numOfPages ? actualPage+2 : actualPage+1 <= numOfPages ? actualPage+1 : actualPage;
     

        for(let i= first; i<= last; i++){
            arr.push(i);
        }
        return arr;
    }

    useEffect(()=>{
        const gallery= document.getElementById('productGallery');
        gallery.scrollTo(0, 0);
    },[products]);

    useEffect(()=>{
        setComponentMount(true);

        const urlSearchParams = new URLSearchParams(window.location.search);
        const params = Object.fromEntries(urlSearchParams.entries());
        if(params.page){
            if(numOfDocuments <= 12){
                setActualPage(1)
            }else{
                setActualPage(parseInt(params.page));
            }
        }
    },[numOfDocuments]);

    const router = useRouter();

    function changePage(operation){
        if(componentMount){
            const urlSearchParams = new URLSearchParams(window.location.search);
            const params = Object.fromEntries(urlSearchParams.entries());
            if(params.page){
                if(operation === '+'){
                    if(actualPage + 1 <= numOfPages){
                        urlSearchParams.set('page', actualPage + 1);
                        setActualPage(prev=> prev + 1);
                    }
                }else if(operation ==='-'){
                    if(actualPage -1 > 0){
                        urlSearchParams.set('page', actualPage - 1);
                        setActualPage(prev=> prev - 1);
                    }
                }
            }else{
                if(operation === '+'){
                    if(actualPage + 1 <= numOfPages){
                        urlSearchParams.append('page', actualPage + 1);
                        setActualPage(prev=> prev + 1);
                    }
                }else if(operation ==='-'){
                    if(actualPage -1 > 0){
                        urlSearchParams.append('page', actualPage - 1);
                        setActualPage(prev=> prev - 1);
                    }
                }
            }

            const newParam= urlSearchParams.toString()
            if(store){
                router.replace(`/tienda?${newParam}`);
            }else{
                router.replace(`/admin?${newParam}`);
            }
        }
    }


    return(
        <div className={styles.container} id='productGallery'>
        {
            products.map((product)=>{
                if(product._id){
                    return(
                    <ProductCard product={product} currency={currency} 
                    store={store} key={product._id} usaToArs={usaToArs}
                    setEdit={setEdit} edit={edit} setPreviewProduct={setPreviewProduct} 
                    setUpdateCart={setUpdateCart} cartProducts={cartProducts}/>
                    )
                }
            }
            )
        }

       <ul className={styles.index}>
           <li onClick={()=> changePage('-')} >{'<'}</li>
           {
             index().map(ele=>{
                 if(componentMount){
                     const urlSearchParams = new URLSearchParams(window.location.search);
                     const params = Object.fromEntries(urlSearchParams.entries());
                     if(params.page){
                         urlSearchParams.set('page',ele);
                     }else{
                         urlSearchParams.append('page', ele);
                     }
                     const newParam= urlSearchParams.toString();
                     //console.log(newParam);

                     return(
                      <li key={ele} style={ele !== actualPage ? {color:'#979797'} : {}}>
                          <Link href={store ? `/tienda?${newParam}` : `/admin?${newParam}`}>
                              <a onClick={()=>{
                                  setActualPage(ele);
                                  }}>
                                  {ele}
                                </a>
                            </Link>
                        </li>
                     )
                 }
             }
             )
           }
           <li onClick={()=> changePage('+')}>{'>'}</li>
       </ul>

       {
           previewProduct ? 
           (<Preview product={previewProduct}
             setPreviewProduct={setPreviewProduct} 
             currency={currency} 
             usaToArs={usaToArs}
             store={store}
             setEdit={setEdit}
             setUpdateCart={setUpdateCart}
             cartProducts={cartProducts}/>):
           (null)
       }
        </div>
    )
}