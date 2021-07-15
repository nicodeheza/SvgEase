import { useState } from 'react';
import Close from './icons/Close';
import Image from 'next/image';
import styles from './logIn.module.css';

export default function SingUp({setFloatWin}){
    const [formFields, setFormFields]= useState({
        email:'',
        password:'',
        repeat:''
    });
    const [message, setMessage]= useState('');

    function submit(e){
        e.preventDefault();
        if(formFields.password === formFields.repeat){
            console.log(formFields);
            setFormFields({
                email:'',
                password:'',
                repeat:''
            });
        }else{
            setMessage('Las contraseñas no coinciden 🤦‍♂️');
        }
    }

    return(
        <div className={styles.logInMainContainer}>
            <div className={styles.headerContainer}>
                <h2>Crear Cuenta</h2>
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
                <input type='password' placeholder='Repetir Contraseña'
                onChange={(e)=>setFormFields({...formFields, repeat: e.target.value})}
                value={formFields.repeat} />
                <button type='submit' onClick={(e)=>submit(e)}>Ingresar</button>
            </form>
            {
                message ? (<p className={styles.message}>{message}</p>) : (null)
            }
            <button className={styles.googleBtn}>
            <Image src='/svgs/google.svg' alt='google' width={30} height={30} />
            <p>Iniciar Sesión con Google</p>
            </button>
        </div>
    )
}