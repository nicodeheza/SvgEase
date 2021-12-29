import Close from "./icons/Close";
import styles from "./account.module.css";
import LogOutBtn from "./btns/LogOutBtn";
import {useAuthContext} from "../contexts/authContext";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import AccountPreview from "./AcconutPreview";

export default function Account({setFloatWin, close, store, userProducts}) {
	const {setAuth} = useAuthContext();
	const router = useRouter();
	const [products, setProducts] = useState([]);

	useEffect(() => {
		if (userProducts.length > 0) {
			const search = new URLSearchParams(userProducts.map((p) => ["id", p]));
			fetch(`api/user/products/get?${search.toString()}`)
				.then((res) => res.json())
				.then((data) => {
					setProducts(data.products);
				})
				.catch((err) => console.log(err));
		}
	}, [userProducts]);

	function logout() {
		// console.log('logout');
		fetch("/api/user/logout", {
			method: "DELETE"
		})
			.then((res) => res.json())
			.then((data) => {
				//console.log(data);
				setAuth(data.auth);
				setFloatWin("none");
				router.replace(router.asPath);
			})
			.catch((err) => console.log(err));
	}

	return (
		<div
			className={
				!close && store
					? styles.storeMainContainer
					: close && store
					? styles.storeMainContainerClose
					: close && !store
					? styles.mainContainerClose
					: styles.mainContainer
			}
		>
			<div className={styles.header}>
				<h2>Mi Cuenta</h2>
				<div className={styles.logOut}>
					<LogOutBtn logoutFunction={logout} />
				</div>
				<div onClick={() => setFloatWin("none")}>
					<Close classN={styles.closeIcon} />
				</div>
			</div>
			<hr />
			<h3 className={styles.MisAnimaciones}>Mis Animaciones</h3>
			<div className={store ? styles.itemsMainContainer : styles.itemsMainContainerHome}>
				{products.length > 0 ? (
					products.map((ele, i) => (
						<div key={i} className={styles.itemsContainer}>
							<div className={styles.preview}>
								<AccountPreview id={ele._id} file={ele.file} classN={styles.animation} />
							</div>
							<div className={styles.textContainer}>
								<h2>{ele.name}</h2>
								<a
									href={`/api/user/products/download/${ele._id}`}
									download={`${ele.name}.json`}
								>
									Descargar
								</a>
							</div>
						</div>
					))
				) : userProducts.length === 0 ? null : (
					<p>Cargando...</p>
				)}
			</div>
		</div>
	);
}
