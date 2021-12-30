/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Link from "next/link";
import TextBtn from "../components/btns/TextBtn";
import AccountBtn from "../components/btns/AccountBtn";
import HomeIcon from "../components/icons/HomeIcon";
import HelpIcon from "../components/icons/HelpIcon";
import {useAuthContext} from "../contexts/authContext";
import CartBtn from "../components/btns/CartBtn";
import styles from "../styles/Tienda.module.css";
import SearchIcon from "../components/icons/SearchIcon";
import {useEffect, useState} from "react";
import CurrencySelector from "../components/CurrencySelector";
import LogIn from "../components/LogIn";
import SingUp from "../components/SingUp";
import Cart from "../components/Cart";
import Account from "../components/Acconut";
import Search from "../components/Search";
import ProductGallery from "../components/ProductGallery";
import serverProps from "../helpersFunctions/serverProps";
import Script from "next/script";

import runMiddleware from "../middleware/runMiddleware";
import Session from "../lib/session";
import {getUserProducts} from "../lib/users";

export async function getServerSideProps(context) {
	const {req, res} = context;
	const session = Session({
		name: "sess",
		secret: process.env.TOKEN_SECRET,
		cookie: {
			maxAge: 60 * 60 * 8, // 8hours
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			path: "/",
			sameSite: "lax"
		}
	});

	await runMiddleware(req, res, session);

	const sendProps = await serverProps(context);
	//console.log(req.session);
	const ses = req.session;
	let serverAuth;
	let userProducts;
	if (ses.passport?.user) {
		serverAuth = true;
		userProducts = await getUserProducts(ses.passport.user.email);
	} else {
		serverAuth = false;
		userProducts = [];
	}

	sendProps.props.serverAuth = serverAuth;
	sendProps.props.userProducts = userProducts;

	return sendProps;
}

export default function Tienda({
	products,
	usaToArs,
	numOfDocuments,
	categoriesTags,
	searchQuery,
	serverAuth,
	currency,
	setCurrency,
	userProducts
}) {
	const {auth, setAuth} = useAuthContext();
	const [showMenu, setShowMenu] = useState(false);
	const [floatWin, setFloatWin] = useState("none");
	const [updateCart, setUpdateCart] = useState(true);
	const [cartProducts, setCartProducts] = useState([]);
	const [firstRender, setFirstRender] = useState(true);

	useEffect(() => {
		if (firstRender) {
			setAuth(serverAuth);
			setFirstRender(false);
		}
	}, [firstRender, serverAuth, setAuth]);

	useEffect(() => {
		if (floatWin !== "none") {
			setShowMenu(false);
		}
	}, [floatWin]);
	useEffect(() => {
		if (showMenu) {
			setFloatWin("none");
		}
	}, [showMenu]);

	return (
		<>
			<Head>
				<title>SvgEase-Tienda</title>
			</Head>
			<Script src="https://sdk.mercadopago.com/js/v2" strategy="afterInteractive" />
			<header className={styles.header}>
				<div className={styles.movilContainer}>
					<img
						src="/svgs/menu.svg"
						alt="menu"
						className={styles.movilMenu}
						onClick={() => setShowMenu((prev) => !prev)}
					/>
					<img src="/svgs/logo0.svg" alt="SvgEase" className={styles.movilLogo} />
					<div onClick={() => setFloatWin("search")}>
						<SearchIcon classN={styles.searchIcon} />
					</div>
				</div>
				<div className={styles.logoLogContainer}>
					<img src="/svgs/logo.svg" alt="Svg Ease" />
					{!auth ? (
						<div className={styles.textBtn}>
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
						</div>
					) : (
						<div>
							<AccountBtn setFloatWin={setFloatWin} />
						</div>
					)}
				</div>
				<div className={styles.rightContainer}>
					<div>
						<Link href="/">
							<a>
								<HomeIcon classN={styles.homeIcon} />
							</a>
						</Link>
						<Link href="/#help">
							<a>
								<HelpIcon classN={styles.helpIcon} />
							</a>
						</Link>
					</div>
					<CurrencySelector currency={currency} setCurrency={setCurrency} />
					<div>
						<CartBtn
							floatWin={floatWin}
							setFloatWin={setFloatWin}
							number={cartProducts.length}
						/>
					</div>
				</div>
			</header>
			{/*movil menu*/}
			<nav className={showMenu ? styles.movilMenuWindow : styles.movilMenuWindowClose}>
				<ul>
					{!auth ? (
						<>
							<li>
								<TextBtn
									text="Iniciar Sesión"
									icon="login"
									movil={true}
									store={true}
									setFloatWin={setFloatWin}
									target={"logIn"}
								/>
							</li>
							<li>
								<TextBtn
									text="Crear Cuenta"
									icon="singup"
									movil={true}
									store={true}
									setFloatWin={setFloatWin}
									target={"singUp"}
								/>
							</li>
						</>
					) : (
						<li>
							<AccountBtn movil={true} store={true} setFloatWin={setFloatWin} />
						</li>
					)}
					<li>
						<Link href="/">
							<a>
								Inicio{" "}
								<span>
									<HomeIcon classN={styles.homeMovil} />
								</span>
							</a>
						</Link>
					</li>
					<li>
						<Link href="/#help">
							<a>
								Ayuda{" "}
								<span>
									<HelpIcon classN={styles.helpMovil} />
								</span>
							</a>
						</Link>
					</li>
					<li>
						<CurrencySelector
							movil={true}
							currency={currency}
							setCurrency={setCurrency}
						/>
					</li>
				</ul>
			</nav>

			<ProductGallery
				products={products}
				store={true}
				currency={currency}
				usaToArs={usaToArs}
				numOfDocuments={numOfDocuments}
				setUpdateCart={setUpdateCart}
				cartProducts={cartProducts}
			/>

			{/*float windows*/}
			{floatWin === "logIn" ? (
				<LogIn setFloatWin={setFloatWin} />
			) : floatWin === "singUp" ? (
				<SingUp setFloatWin={setFloatWin} />
			) : null}

			{floatWin === "cart" ? (
				<Cart
					setFloatWin={setFloatWin}
					open={true}
					store={true}
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
					store={true}
					currency={currency}
					updateCart={updateCart}
					setUpdateCart={setUpdateCart}
					usaToArs={usaToArs}
					cartProducts={cartProducts}
					setCartProducts={setCartProducts}
					userProducts={userProducts}
				/>
			)}

			{floatWin === "account" ? (
				<Account setFloatWin={setFloatWin} store={true} userProducts={userProducts} />
			) : (
				<Account
					setFloatWin={setFloatWin}
					close={true}
					store={true}
					userProducts={userProducts}
				/>
			)}

			{/* search*/}

			{floatWin === "search" ? (
				<Search
					setFloatWin={setFloatWin}
					open={true}
					categories={categoriesTags}
					searchQuery={searchQuery}
				/>
			) : (
				<Search
					setFloatWin={setFloatWin}
					open={false}
					categories={categoriesTags}
					searchQuery={searchQuery}
				/>
			)}
		</>
	);
}
