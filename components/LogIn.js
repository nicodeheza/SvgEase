import { useState } from 'react';
import Close from './icons/Close';
import Image from 'next/image';
import styles from './logIn.module.css';
import { useAuthContext } from '../contexts/authContext';
import Link from 'next/link';

export default function LogIn({setFloatWin}){

    const {setAuth}= useAuthContext();

    const [formFields, setFormFields]= useState({
        email:'',
        password:''
    });
    const [message, setMessage]= useState('');

    function submit(e){
        e.preventDefault();
        if(formFields.email && formFields.password){
            if( /\w+@[\w.]+/i.test(formFields.email)){
                //console.log(formFields);

                fetch('/api/user/login',{
                    method: 'POST',
                    headers:{
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formFields)
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
                        setAuth(data.auth);
                        setFloatWin('none');
                        console.log(data);
                    }
                })
                .catch(err => console.log(err));
                setFormFields({
                    email:'',
                    password:''
                });
            }else{
                setMessage('Por favor ingrese una dirección de email valida')
            }
        }else{
            setMessage('Todos los campos son obligatorios')
        }
    }

    function githubLogin(){
        fetch('/api/user/github')
        .then(res=> res.json())
        .then(data=>{
            console.log(data);
        })
        .catch(err=> console.log(err));
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
                <input type='email' placeholder='Email' autoComplete='email'
                onChange={(e)=>setFormFields({...formFields, email: e.target.value})}
                value={formFields.email} />
                <input type='password' placeholder='Contraseña' autoComplete='current-password'
                onChange={(e)=>setFormFields({...formFields, password: e.target.value})}
                value={formFields.password} />
                <button type='submit' onClick={(e)=>submit(e)}>Ingresar</button>
            </form>
            {
                message ? (<p className={styles.message}>{message}</p>) : (null)
            }
            <Link  href='/api/user/github'>
            <a>
            <button className={styles.googleBtn}>
            <Image src='/svgs/gitHub.svg' alt='github' width={40} height={40} />
            <p>Iniciar Sesión con GitHub</p>
            </button>
            </a>
            </Link>
            <p className={styles.footer}>Olvidaste tu contraseña? Hace click <span 
            onClick={()=>setMessage('Aun no disponible, lo sentimos 😢')}>aquí</span></p>
        </div>
    )
}