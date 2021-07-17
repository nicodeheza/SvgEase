/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';
import Link from 'next/link';
import TextBtn from '../components/btns/TextBtn';
import AccountBtn from '../components/btns/AccountBtn';
import HomeIcon from '../components/icons/HomeIcon';
import HelpIcon from '../components/icons/HelpIcon'; 
import {useAuthContext} from '../contexts/authContext';
import CartBtn from '../components/btns/CartBtn';
import styles from '../styles/Tienda.module.css';
import SearchIcon from '../components/icons/SearchIcon';
import { useEffect, useState } from 'react';
import CurrencySelector from '../components/CurrencySelector';
import LogIn from '../components/LogIn';
import SingUp from '../components/SingUp';
import Cart from '../components/Cart';
import Account from '../components/Acconut';

export default function Tienda(){
    const {auth}= useAuthContext();
    const [showMenu, setShowMenu]= useState(false);
    const [floatWin, setFloatWin] = useState("none");

    useEffect(()=>{
        if(floatWin !== 'none'){
            setShowMenu(false);
        }
    },[floatWin]);

    return(
        <>
        <Head>
            <title>SvgEase-Tienda</title>
        </Head>
        <header className={styles.header}>
            <div className={styles.movilContainer}>
                <img src='/svgs/menu.svg' alt="menu" className={styles.movilMenu} onClick={()=>setShowMenu(prev=> !prev)} />
                <img src='/svgs/logo0.svg' alt='SvgEase' className={styles.movilLogo}/>
                <div>
                    <SearchIcon  classN={styles.searchIcon}/>
                </div>
            </div>
            <div className={styles.logoLogContainer}>
            <img src='/svgs/logo.svg' alt='Svg Ease'/>
            {
                !auth ? 
                (
                    <div className={styles.textBtn}>
                    <TextBtn text="Iniciar Sesión" icon="login" setFloatWin={setFloatWin} target={'logIn'}/>
                    <TextBtn text="Crear Cuenta" icon="singup" setFloatWin={setFloatWin} target={'singUp'}/>
                    </div>
                ) : (
                    <div>
                    <AccountBtn setFloatWin={setFloatWin}/>
                    </div>
                )
            }
            </div>
            <div className={styles.rightContainer}>
            <div>
                <Link href='/'>
                    <a>
                        <HomeIcon classN={styles.homeIcon}/>
                    </a>
                </Link>
                <Link href='/#help'>
                    <a>
                        <HelpIcon classN={styles.helpIcon}/>
                    </a>
                </Link>
            </div>
                <CurrencySelector/>
            <div>
                <CartBtn setFloatWin={setFloatWin}/>
            </div>
            </div>
        </header>
        {/*movil menu*/}
        <div className={showMenu ? styles.movilMenuWindow : styles.movilMenuWindowClose }>
            <ul>
            {
               !auth ? 
               (
                   <>
                   <li><TextBtn text="Iniciar Sesión" icon="login" movil={true} store={true} 
                   setFloatWin={setFloatWin} target={'logIn'}/></li>
                   <li><TextBtn text="Crear Cuenta" icon="singup" movil={true} store={true}
                    setFloatWin={setFloatWin} target={'singUp'}/></li>
                   </>
               ) : (
                   <li><AccountBtn movil={true} store={true} setFloatWin={setFloatWin} /></li>
               )
            }
                <li><Link href='/' ><a>Inicio{" "}<span><HomeIcon classN={styles.homeMovil}/></span></a></Link></li>
                <li><Link href='/#help' ><a>Ayuda{" "}<span><HelpIcon classN={styles.helpMovil}/></span></a></Link></li>
                <li><CurrencySelector movil={true}/></li>
            </ul>
        </div>

        {/*float windows*/}
        {floatWin === "logIn" ? (
        <LogIn setFloatWin={setFloatWin} />
      ) : floatWin === "singUp" ? (
        <SingUp setFloatWin={setFloatWin} />
      ) : null}

        {floatWin === "cart" ? (
        <Cart setFloatWin={setFloatWin} open={true} store={true} />
      ) : (
        <Cart setFloatWin={setFloatWin} open={false} store={true}/>
      )}

     {
        floatWin ==='account' ?
        (
          <Account setFloatWin={setFloatWin} store={true}/>
        ): (<Account setFloatWin={setFloatWin} close={true} store={true} />)
      }


        </>
    )
}