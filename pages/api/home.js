import nextConnect from "next-connect";
import auth from "../../middleware/auth";
import Exchange from "../../models/Exchange";
import {serialize} from "cookie";
import {getUserProducts} from "../../lib/users";

const handler = nextConnect();

handler.use(auth).get(async (req, res) => {
	try {
		const cookie = req.cookies;
		// console.log(cookie);
		const exchangeCookie = cookie["exchangeRate"];
		let usaToArs;

		if (!exchangeCookie) {
			const now = new Date();
			const expire = new Date(
				now.getFullYear(),
				now.getMonth(),
				now.getDate() + 1,
				10,
				0,
				0,
				0
			);
			const dbExchange = await Exchange.find({});
			if (!dbExchange[0] || dbExchange[0].expires <= now) {
				await Exchange.remove({});

				const exchangeRateRes = await fetch(
					`https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_API_KEY}/pair/USD/ARS`
				);
				const exchangeRate = await exchangeRateRes.json();
				usaToArs = exchangeRate.conversion_rate;

				const newExchange = new Exchange({
					exchange: usaToArs,
					expires: expire
				});
				await newExchange.save();
				console.log("api");
			} else {
				console.log("db");
				usaToArs = dbExchange[0].exchange;
			}

			const newCookie = serialize("exchangeRate", usaToArs, {
				expires: expire,
				httpOnly: true,
				path: "/",
				sameSite: "lax",
				secure: process.env.NODE_ENV === "production"
			});
			console.log("exchange");

			res.setHeader("Set-Cookie", [newCookie]);
		} else {
			usaToArs = parseFloat(exchangeCookie);
			// console.log(exchangeCookie)
		}

		if (req.isAuthenticated()) {
			const userProducts = await getUserProducts(req.user.email);
			res.json({auth: true, usaToArs, userProducts});
		} else {
			res.json({auth: false, usaToArs, userProducts: []});
		}
	} catch (err) {
		console.log(err);
	}
});

export default handler;
