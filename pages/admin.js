/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import LogOutBtn from "../components/btns/LogOutBtn";
import CurrencySelector from "../components/CurrencySelector";
import AddIcon from "../components/icons/AddIcon";
import styles from '../styles/Admin.module.css';
import SearchIcon from "../components/icons/SearchIcon";
import Search from "../components/Search";
import AddEditAnimation from "../components/adminComponents/AddEditAnimation";
import { useEffect, useState } from "react";

export default function Admin(){

    const [showMenu, setShowMenu]= useState(false);
    const [floatWin, setFloatWin]= useState('none');
    
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
            <CurrencySelector />
            <button className={styles.searchBtn} onClick={()=>setFloatWin('search')}>
                <SearchIcon  classN={styles.searchIcon}/>
            </button>
            <button className={styles.addBtn}>
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
            <CurrencySelector movil={true} />
            </li>
            </ul>
        </nav>
        {
            floatWin === 'search' ?
            (<Search setFloatWin={setFloatWin} open={true} />) : 
            (<Search setFloatWin={setFloatWin} open={false} />)
        }


        <AddEditAnimation />

        </>
    )
}