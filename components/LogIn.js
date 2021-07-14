import { useState } from 'react';
import Close from './icons/Close';
import Image from 'next/image';
import styles from './logIn.module.css';

export default function LogIn({setFloatWin}){
    const [formFields, setFormFields]= useState({
        email:'',
        password:''
    });
    const [message, setMessage]= useState('');

    function submit(e){
        e.preventDefault();
        console.log(formFields);
        setFormFields({
            email:'',
            password:''
        });
    }

    return(
        <div className={styles.logInMainContainer}>
            <div className={styles.headerContainer}>
                <h2>Iniciar Sesión</h2>
                <div onClick={()=>setFloatWin('none')}>
                <Close classN={styles.close} />
                </div>
            </div>
            <form className={styles.form}>
                <input type='text' placeholder='Email' 
                onChange={(e)=>setFormFields({...formFields, email: e.target.value})}
                value={formFields.email} />
                <input type='password' placeholder='Contraseña'
                onChange={(e)=>setFormFields({...formFields, password: e.target.value})}
                value={formFields.password} />
                <button type='submit' onClick={(e)=>submit(e)}>Ingresar</button>
            </form>
            {
                message ? (<p className={styles.message}>{message}</p>) : (null)
            }
            <button className={styles.googleBtn}>
            <Image src='/svgs/google.svg' alt='google' width={30} height={30} />
            <p>Iniciar Sesión con Google</p>
            </button>
            <p className={styles.footer}>Olvidaste tu contraseña? Hace click <span 
            onClick={()=>setMessage('Aun no disponible, lo sentimos 😢')}>aquí</span></p>
        </div>
    )
}