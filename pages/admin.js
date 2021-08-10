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
import serverProps from "../helpersFunctions/serverProps";
import getSession from "../lib/getSession";
import Link from "next/link";



export async function getServerSideProps(context){

    const sendProps= await serverProps(context);

    const {req, res}= context;
    await getSession(req, res);
    console.log(req.session);
    const session= req.session;
    let adminAuth;
    let isLogin;
    if(session.passport?.user){
        isLogin= true;
        if(session.passport?.user.admin){
            adminAuth= true;
        }else{
            adminAuth= false;
        }
    }else{
        isLogin=false;
        adminAuth= false
    }
    
    sendProps.props.adminAuth= adminAuth;
    sendProps.props.isLogin= isLogin;

    return sendProps;

}

export default function Admin({products, usaToArs, numOfDocuments, categoriesTags, searchQuery, adminAuth, isLogin}){

    const [showMenu, setShowMenu]= useState(false);
    const [floatWin, setFloatWin]= useState('none');
    const [currency, setCurrency]= useState('ars');
    const [edit, setEdit]= useState({});
    const [message, setMessage]= useState('');
    const [loginFields, setLoginFields]= useState({
        email:'',
        password:''
    });


    const router = useRouter();
    const refreshData = () => {
        router.replace(router.asPath);
      }
    
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

    function login(e){
        e.preventDefault();
        if(loginFields.email && loginFields.password){
            if( /\w+@[\w.]+/i.test(loginFields.email)){

                fetch('/api/user/login',{
                    method: 'POST',
                    headers:{
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(loginFields)
                })
                .then(res=>{
                    if(res.status === 401){
                        setMessage('Nombre de usuario o contraseña incorrectos');
                    } else{
                        return res.json();
                    }
                })
                .then(data=>{
                    if(data){
                        //setAuth(data.auth);
                       // setFloatWin('none');
                        console.log(data);
                        router.replace(router.asPath);
                    }
                })
                .catch(err => console.log(err));
                setLoginFields({
                    email:'',
                    password:''
                });
                setMessage('');
            }else{
                setMessage('introduzca una dirección de email valida.')
            }

        }else{
            setMessage('Todos los campos son obligatorios.')
        }
    }

    function logout(){
        fetch('/api/user/logout')
        .then(res=>res.json())
        .then(data=>{
            if(data){
                router.replace(router.asPath);
            }
        })
        .catch(err=>console.log(err));
    }


    return(
        <>
        <Head>
            <title>SvgEase-Modo Administración</title>
        </Head>
        {
            !adminAuth && !isLogin ? (
                <>
                <div className={styles.loginContainer}>
                    <h1>SvgEase modo Administración</h1>
                    <p>Por favor inicie session con una cuenta de administrador</p>
                    <form>
                        <label from='email'>Email: </label>
                        <input type='email' name='email'
                        value={loginFields.email} 
                        onChange={(e)=> setLoginFields({...loginFields, email: e.target.value})} /><br/><br/>
                        <label from='password'>Password: </label>
                        <input type='password' name='password' 
                        value={loginFields.password}
                        onChange={(e)=> setLoginFields({...loginFields, password: e.target.value})}/><br/><br/>
                        <button onClick={(e)=>login(e)}>ingresar</button><br/>
                        <p className={styles.formMessage}>{message}</p>
                    </form>
                </div>
                </>
            ) : !adminAuth && isLogin ? (
                <>
                <div className={styles.loginContainer}>
                    <h1>SvgEase modo Administración</h1>
                    <p>No tiene permiso de administrador</p>
                    <button onClick={()=> logout()}>Intentar con otra cuenta</button> <br/><br/>
                    <Link href='/tienda'>
                    <a>
                    <button>Ir a la tienda</button>
                    </a>
                    </Link>
                </div>
                </>

            ) :
            
            (
        <>
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
            <LogOutBtn logoutFunction={logout}/>
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
        setEdit={setEdit} edit={edit} numOfDocuments={numOfDocuments} />

        {
            floatWin === 'search' ?
            (<Search setFloatWin={setFloatWin} open={true} categories={categoriesTags} searchQuery={searchQuery}/>) : 
            (<Search setFloatWin={setFloatWin} open={false} categories={categoriesTags} searchQuery={searchQuery} />)
        }

        {
            floatWin === 'addEdit' ?
            (<AddEditAnimation setFloatWin={setFloatWin} open={true} usaToArs={usaToArs} refreshData={refreshData}
                 categories={categoriesTags} edit={edit} setEdit={setEdit} products={products} />):
            (<AddEditAnimation setFloatWin={setFloatWin} open={false} usaToArs={usaToArs} refreshData={refreshData}
                 categories={categoriesTags} edit={edit} setEdit={setEdit} products={products} />)
        }
         </>
            )
        }
       
        </>
    )
}