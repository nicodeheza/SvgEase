import nextConnect from "next-connect";
import auth from "../../middleware/auth";
import Exchange from "../../models/Exchange";
import {getUserProducts} from "../../lib/users";
import dbConnect from "../../lib/mongooseConect";

const handler = nextConnect();

handler.use(auth).get(async (req, res) => {
	try {
		await dbConnect();
		let usaToArs;
		const now = new Date();
		const dbExchange = await Exchange.find({});
		if (!dbExchange[0] || dbExchange[0].expires <= now) {
			await Exchange.remove({});

			const exchangeRateRes = await fetch(
				`https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_API_KEY}/pair/USD/ARS`
			);

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

			await newExchange.save();
		} else {
			usaToArs = dbExchange[0].exchange;
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
