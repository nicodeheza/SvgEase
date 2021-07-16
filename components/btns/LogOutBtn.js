import LogOutIcon from "../icons/LogOutIcon";
import styles from './logOutBtn.module.css';

export default function LogOutBtn() {
  return (
    <button className={styles.btn}>
      Cerrar Sesión{" "}
      <samp>
        <LogOutIcon classN={styles.icon} />
      </samp>
    </button>
  );
}
