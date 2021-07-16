import Close from "./icons/Close";
import LogOutIcon from "./icons/LogOutIcon";
import styles from './account.module.css';
import LogOutBtn from "./btns/LogOutBtn";

export default function Account({setFloatWin, close}){

    return(
        <div className={close ? styles.mainContainerClose : styles.mainContainer}>
            <div className={styles.header}>
                <h2>Mi Cuenta</h2>
                <div className={styles.logOut}>
                <LogOutBtn />
                </div>
                <div onClick={()=>setFloatWin('none')}>
                    <Close classN={styles.closeIcon}/>
                </div>
            </div>
            <hr/>
            <h3 className={styles.MisAnimaciones}>Mis Animaciones</h3>
            <div>

            </div>
        </div>
    )
}