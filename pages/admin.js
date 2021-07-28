/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import LogOutBtn from "../components/btns/LogOutBtn";
import CurrencySelector from "../components/CurrencySelector";
import AddIcon from "../components/icons/AddIcon";
import styles from '../styles/Admin.module.css';
import SearchIcon from "../components/icons/SearchIcon";
import Search from "../components/Search";
import AddEditAnimation from "../components/adminComponents/AddEditAnimation";
import ProductGallery from "../components/ProductGallery";
import {useRouter} from 'next/router';
import { useEffect, useState } from "react";

import dbConnect from "../lib/mongooseConect";
import Product from "../models/productSchema";
import Category from "../models/CategorySchema";

export async function getServerSideProps(){

    await dbConnect();
    const productsRes= await Product.find({});
    const categoriesRes= await Category.find({});

    const products= productsRes.map(doc=>{
        const product= doc.toObject();
        product._id= product._id.toString();
        product.file= require(`../productsFiles/${product._id}.json`);
        return product;
    });

    const categories= categoriesRes.map(doc=>{
        const category= doc.toObject();
        category._id= category._id.toString()
        return category;
    });

    
    const exchangeRateRes= await fetch(`https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_API_KEY}/pair/USD/ARS`);
    const exchangeRate= await exchangeRateRes.json();
    const usaToArs= exchangeRate.conversion_rate;
    console.log('exchange');
    

    return {props: {products, categories, usaToArs}}

}

export default function Admin({products, categories, usaToArs}){

    const [showMenu, setShowMenu]= useState(false);
    const [floatWin, setFloatWin]= useState('none');
    const [currency, setCurrency]= useState('ars');
    //const [products, setProducts]= useState(FetchProducts);
    const [edit, setEdit]= useState({});


    const router = useRouter();
    const refreshData = () => {
        router.replace(router.asPath);
      }

    // useEffect(()=>{
    //     setProducts(FetchProducts);
    // },[products])
    
    useEffect(()=>{
        if(floatWin !== 'none'){
            setShowMenu(false);
        }
    },[floatWin]);

    useEffect(()=>{
        if(showMenu){
            setFloatWin('none');
        }
    },[showMenu]);


    return(
        <>
        <Head>
            <title>SvgEase-Modo Administración</title>
        </Head>
        <header className={styles.header}>

            <div className={styles.titleContainer}>
            <img src='/svgs/logo.svg' alt='Svg Ease' className={styles.logo}/>
            <h2>Modo Administrador</h2>
            </div>

            <div className={styles.movilTitleContainer} >
            <img src='/svgs/menu.svg' alt='menu button' className={styles.menu}
            onClick={()=>setShowMenu(prev=> !prev)}/>
            <img src='/svgs/logo0.svg' alt='Svg Ease' className={styles.logoMovil} />
            </div>

            <div className={styles.btnsContainer}>
            <div className={styles.logOutContainer}>
            <LogOutBtn />
            </div> 
            <CurrencySelector currency={currency} setCurrency={setCurrency} />
            <button className={styles.searchBtn} onClick={()=>setFloatWin('search')}>
                <SearchIcon  classN={styles.searchIcon}/>
            </button>
            <button className={styles.addBtn} onClick={()=>setFloatWin('addEdit')}>
                <AddIcon classN={styles.addIcon}/>
            </button>
            </div>
        </header>

        <nav className={showMenu ? styles.menuOpen : styles.menuClose}>
            <ul className={styles.menuList}>
            <li>
            <h2>Modo Administrador</h2>
            </li>
            <li>
            <LogOutBtn />
            </li>
            <li>
            <CurrencySelector movil={true} currency={currency} setCurrency={setCurrency} />
            </li>
            </ul>
        </nav>

        <ProductGallery products={products} store={false} currency={currency} usaToArs={usaToArs} 
        setEdit={setEdit} edit={edit} />

        {
            floatWin === 'search' ?
            (<Search setFloatWin={setFloatWin} open={true} />) : 
            (<Search setFloatWin={setFloatWin} open={false} />)
        }

        {
            floatWin === 'addEdit' ?
            (<AddEditAnimation setFloatWin={setFloatWin} open={true} usaToArs={usaToArs} refreshData={refreshData}
                 categories={categories} edit={edit} setEdit={setEdit} products={products} />):
            (<AddEditAnimation setFloatWin={setFloatWin} open={false} usaToArs={usaToArs} refreshData={refreshData}
                 categories={categories} edit={edit} setEdit={setEdit} products={products} />)
        }
        </>
    )
}