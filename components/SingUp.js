import { useState } from 'react';
import Close from './icons/Close';
import Image from 'next/image';
import styles from './logIn.module.css';
import Link from 'next/link';

export default function SingUp({setFloatWin}){
    const [formFields, setFormFields]= useState({
        email:'',
        password:'',
        repeat:''
    });
    const [message, setMessage]= useState('');

    function submit(e){
        e.preventDefault();
        if(formFields.password && formFields.repeat && formFields.email){
        if( /\w+@[\w.]+/i.test(formFields.email)){
        if(formFields.password === formFields.repeat){
            //console.log(formFields);
            fetch('/api/user/singup',{
                method: 'POST',
                headers:{
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({email: formFields.email, password: formFields.password})
            }).then(res=> res.json())
            .then(data=>{
                console.log(data);
                setMessage(data.message);
            }).catch(err=> console.log(err));

            setFormFields({
                email:'',
                password:'',
                repeat:''
            });
            setMessage('');
        }else{
            setMessage('Las contraseñas no coinciden 🤦‍♂️');
        }

    }else{
        setMessage('Email invalido 🤷‍♀️');
    }
      }else{
          setMessage('Todos los campos son requeridos.');
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
                <input type='email' placeholder='Email' autoComplete='email'
                onChange={(e)=>setFormFields({...formFields, email: e.target.value})}
                value={formFields.email} />
                <input type='password' placeholder='Contraseña' autoComplete='new-password'
                onChange={(e)=>setFormFields({...formFields, password: e.target.value})}
                value={formFields.password} />
                <input type='password' placeholder='Repetir Contraseña'  autoComplete='new-password'
                onChange={(e)=>setFormFields({...formFields, repeat: e.target.value})}
                value={formFields.repeat} />
                <button type='submit' onClick={(e)=>submit(e)}>Ingresar</button>
            </form>
            {
                message ? (<p className={styles.message}>{message}</p>) : (null)
            }
            <Link href='/api/user/github'>
            <a>
            <button className={styles.googleBtn}>
            <Image src='/svgs/gitHub.svg' alt='github' width={40} height={40} />
            <p>Iniciar Sesión con GitHub</p>
            </button>
            </a>
            </Link>
        </div>
    )
}