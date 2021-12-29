import LoginIcon from "../icons/LoginIcon";
import SingupIcon from "../icons/SingupIcon";
import style from "./textBtn.module.css";

export default function TextBtn({text, icon, setFloatWin, target, movil, store}) {
	return (
		<div
			onClick={() => setFloatWin(target)}
			className={
				store && movil
					? style.containerMovilStore
					: movil
					? style.containerMovil
					: style.container
			}
		>
			<p className={style.text}>{text}</p>
			{icon === "login" ? <LoginIcon /> : <SingupIcon />}
		</div>
	);
}
