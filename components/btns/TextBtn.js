import LoginIcon from '../icons/LoginIcon'
import SingupIcon from '../icons/singupIcon'
import style from './textBtn.module.css'

export default function TextBtn({text, icon, onClick, movil}){
     
    return(
        <div onClick={()=> onClick} className={movil ? style.containerMovil : style.container}>
            <p className={style.text}>{text}</p>
            {icon ==='login' ?
            (<LoginIcon />) : (<SingupIcon />)}
            
        </div>
    )
}