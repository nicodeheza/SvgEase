import UserIcon from '../icons/UserIcon';
import styles from './accountBtn.module.css';

export default function AccountBtn({movil, setFloatWin, store}){

    return(
        <div className={store && movil ? styles.containerMovilStore : 
        movil ? styles.containerMovil : styles.container} onClick={()=> setFloatWin('account')}>
            <p>Mi Cuenta</p>
            <UserIcon classN={store && movil ? styles.storeMovilIcon : styles.icon} />
        </div>
    )
}