import UserIcon from '../icons/UserIcon';
import styles from './accountBtn.module.css';

export default function AccountBtn({movil, setFloatWin}){

    return(
        <div className={movil ? styles.containerMovil : styles.container} onClick={()=> setFloatWin('account')}>
            <p>Mi Cuenta</p>
            <UserIcon classN={styles.icon} />
        </div>
    )
}