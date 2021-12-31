import nextConnect from "next-connect";
import auth from "../../middleware/auth";
import Exchange from "../../models/Exchange";
import {getUserProducts} from "../../lib/users";

const handler = nextConnect();

handler.use(auth).get(async (req, res) => {
	try {
		let usaToArs;
		const now = new Date();
		console.log("db exchange query");
		const dbExchange = await Exchange.find({});
		if (!dbExchange[0] || dbExchange[0].expires <= now) {
			console.log("db exchange remove");

			await Exchange.remove({});

			console.log("fetch api data");

			const exchangeRateRes = await fetch(
				`https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_API_KEY}/pair/USD/ARS`
			);

			console.log("convert data");

			const exchangeRate = await exchangeRateRes.json();
			usaToArs = exchangeRate.conversion_rate;

			const expire = new Date(
				now.getFullYear(),
				now.getMonth(),
				now.getDate() + 1,
				10,
				0,
				0,
				0
			);
			const newExchange = new Exchange({
				exchange: usaToArs,
				expires: expire
			});
			console.log("save exchange in db");

			await newExchange.save();
			console.log("api");
		} else {
			console.log("db");
			usaToArs = dbExchange[0].exchange;
		}

		if (req.isAuthenticated()) {
			console.log("get user products");
			const userProducts = await getUserProducts(req.user.email);

			console.log("res");
			res.json({auth: true, usaToArs, userProducts});
		} else {
			console.log("res");
			res.json({auth: false, usaToArs, userProducts: []});
		}
	} catch (err) {
		console.log(err);
	}
});

export default handler;
