import LogOutIcon from "../icons/LogOutIcon";
import styles from './logOutBtn.module.css';

export default function LogOutBtn({logoutFunction}) {

  return (
    <button className={styles.btn} onClick={()=>logoutFunction()}>
      Cerrar Sesión{" "}
      <samp>
        <LogOutIcon classN={styles.icon} />
      </samp>
    </button>
  );
}
