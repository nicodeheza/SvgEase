/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import styles from "../styles/Home.module.css";
import TextBtn from "../components/btns/TextBtn";
import CartBtn from "../components/btns/CartBtn";
import IconGallery from "../components/homeComponents/IconsGallery";
import ParallaxAnimation from "../components/homeAnimations/ParallaxAnimation";
import HeaderAnimation from "../components/homeAnimations/HeaderAnimation";
import IlusAnimation from "../components/homeAnimations/IlusAnimation";
import LluviaAnimation from "../components/homeAnimations/LluviaAniation";
import LoadingGallery from "../components/homeComponents/LoadingGallery";
import Interactive from "../components/homeComponents/Interactive";
import TiendaBtn from "../components/btns/TiendaBtn";
import Device from "../components/homeAnimations/Devices";
import LogIn from "../components/LogIn";
import SingUp from "../components/SingUp";
import Cart from "../components/Cart";
import AccountBtn from "../components/btns/AccountBtn";
import {useEffect, useState} from "react";
import Link from "next/link";
import {useAuthContext} from "../contexts/authContext";
import Account from "../components/Acconut";
import Script from "next/script";

export default function Home({currency}) {
	const [showMenu, setShowMenu] = useState(false);
	const [floatWin, setFloatWin] = useState("none");
	const {auth, setAuth} = useAuthContext();
	const [updateCart, setUpdateCart] = useState(true);
	const [usaToArs, setUsaToArs] = useState(0);
	const [cartProducts, setCartProducts] = useState([]);
	const [userProducts, setUserProducts] = useState([]);

	useEffect(() => {
		fetch("/api/home")
			.then((res) => res.json())
			.then((data) => {
				setAuth(data.auth);
				setUsaToArs(data.usaToArs);
				setUserProducts(data.userProducts);
			})
			.catch((err) => console.log(err));
	}, [setAuth]);

	useEffect(() => {
		if (!auth) {
			setUserProducts([]);
		}
	}, [auth]);

	useEffect(() => {
		if (floatWin !== "none") {
			setShowMenu(false);
		}
	}, [floatWin]);

	function scrollTo(id) {
		const ele = document.getElementById(id);
		const offset = -150;
		const y = ele.getBoundingClientRect().top + window.pageYOffset + offset;
		window.scrollTo({top: y});
		setShowMenu(false);
	}

	return (
		<>
			<Head>
				<title>SvgEase-Home</title>
			</Head>
			<Script src="https://sdk.mercadopago.com/js/v2" strategy="afterInteractive" />
			<header>
				<div className={styles.headerContainerFirst}>
					<div className={styles.btnContainer}>
						<img
							src="/svgs/menu.svg"
							alt="menu"
							className={styles.menu}
							onClick={() => setShowMenu((prev) => !prev)}
						/>
						<img src="/svgs/logo0.svg" alt="Svg Ease" className={styles.topLogo} />
						{auth ? (
							<AccountBtn setFloatWin={setFloatWin} />
						) : (
							<>
								<TextBtn
									text="Iniciar Sesión"
									icon="login"
									setFloatWin={setFloatWin}
									target={"logIn"}
								/>
								<TextBtn
									text="Crear Cuenta"
									icon="singup"
									setFloatWin={setFloatWin}
									target={"singUp"}
								/>
							</>
						)}
					</div>
					<CartBtn
						floatWin={floatWin}
						setFloatWin={setFloatWin}
						number={cartProducts.length}
					/>
				</div>
				<nav className={showMenu ? styles.movilMenuShow : styles.movilMenuHidden}>
					{auth ? (
						<AccountBtn movil={true} setFloatWin={setFloatWin} />
					) : (
						<>
							<TextBtn
								text="Iniciar Sesión"
								icon="login"
								movil={true}
								setFloatWin={setFloatWin}
								target={"logIn"}
							/>
							<TextBtn
								text="Crear Cuenta"
								icon="singup"
								movil={true}
								setFloatWin={setFloatWin}
								target={"singUp"}
							/>
						</>
					)}
					<Link href="/tienda">
						<a className={styles.movilMenuA}>Tienda</a>
					</Link>
					<a onClick={() => scrollTo("acerca")} className={styles.movilMenuA}>
						Acerca de SvgEace
					</a>
					<a onClick={() => scrollTo("help")} className={styles.movilMenuA}>
						Como Compro
					</a>
				</nav>
			</header>

			{floatWin === "account" ? (
				<Account setFloatWin={setFloatWin} userProducts={userProducts} />
			) : (
				<Account setFloatWin={setFloatWin} close={true} userProducts={userProducts} />
			)}
			<HeaderAnimation />
			<nav className={styles.nav}>
				<ul className={styles.navUl}>
					<li className={styles.navLi}>
						<Link href="/tienda">
							<a>Tienda</a>
						</Link>
					</li>
					<li className={styles.navLi} onClick={() => scrollTo("acerca")}>
						Acerca de SvgEase
					</li>
					<li className={styles.navLi} onClick={() => scrollTo("help")}>
						Como Comprar
					</li>
				</ul>
			</nav>

			{/* log in - sing up */}
			{floatWin === "logIn" ? (
				<LogIn setFloatWin={setFloatWin} setUserProducts={setUserProducts} />
			) : floatWin === "singUp" ? (
				<SingUp setFloatWin={setFloatWin} />
			) : null}

			<main>
				<section className={styles.gallery} id="acerca">
					<div className={styles.titleGalleryContainer}>
						<h1 className={styles.galleryTitle}>Todo tipo de animaciones</h1>
						<div className={styles.galleryContainer}>
							<div className={styles.parallax}>
								<ParallaxAnimation />
								<p className={styles.parallaxTitle}>Parallax</p>
							</div>
							<div className={styles.icons}>
								<IconGallery />
							</div>
							<div className={styles.illustrations}>
								<IlusAnimation />
								<p className={styles.ilusTitle}>Ilustraciones</p>
							</div>
							<div className={styles.cards}>
								<LluviaAnimation />
								<p className={styles.cardsTitle}>Tarjetas</p>
								<img src="/svgs/clima.svg" alt="image" className={styles.climaImg} />
							</div>
							<div className={styles.load}>
								<LoadingGallery />
							</div>
						</div>
						<div className={styles.galleryBtn}>
							<TiendaBtn />
						</div>
					</div>
				</section>

				<Interactive />

				<section className={styles.deviceContainer}>
					<div className={styles.deviceAnimationContainer}>
						<Device />
					</div>
					<h1>Multiplataforma y fáciles de implementar</h1>
					<div className={styles.deviceText}>
						Nuestras animaciones están hechas con Lotti una tecnología compatible con web,
						android y ios muy fácil de implementar en tus proyectos. <br /> Mas info{" "}
						<a
							href="https://airbnb.io/lottie/#/"
							target="_blank"
							rel="noreferrer"
							className={styles.lottieLink}
						>
							aquí.
						</a>
						<span>
							<TiendaBtn />
						</span>
					</div>
				</section>

				<section className={styles.helpSection} id="help">
					<h1>¿Como Comprar?</h1>
					<ul>
						<li>Agrega las animaciones que quieras en el carro</li>
						<li>
							Una vez que hayas seleccionado todas las animaciones que quieras anda al
							carro
						</li>
						<li>Loguéate o regístrate si todavía no lo hiciste</li>
						<li>Elegí tu medio de pago</li>
						<li>
							Las animaciones quedan guardadas en en tu perfil para que las descargues
							cuando y las veces que quieras
						</li>
					</ul>
					<div className={styles.helpBtnContainer}>
						<TiendaBtn />
					</div>
					<img src="/img/tuto-temp.png" alt="video ayuda" />
				</section>
			</main>
			<footer className={styles.footer}>
				<ul>
					<li>
						<Link href="/tienda">
							<a>Tienda</a>
						</Link>
					</li>
					<li onClick={() => scrollTo("acerca")}>Acerca de SvgEase</li>
					<li onClick={() => scrollTo("help")}>Como Comprar</li>
				</ul>
				<img src="/svgs/logo.svg" alt="Svg Ease" />
			</footer>

			{floatWin === "cart" ? (
				<Cart
					setFloatWin={setFloatWin}
					open={true}
					currency={currency}
					updateCart={updateCart}
					setUpdateCart={setUpdateCart}
					usaToArs={usaToArs}
					cartProducts={cartProducts}
					setCartProducts={setCartProducts}
					userProducts={userProducts}
				/>
			) : (
				<Cart
					setFloatWin={setFloatWin}
					open={false}
					currency={currency}
					updateCart={updateCart}
					setUpdateCart={setUpdateCart}
					usaToArs={usaToArs}
					cartProducts={cartProducts}
					setCartProducts={setCartProducts}
					userProducts={userProducts}
				/>
			)}
		</>
	);
}
