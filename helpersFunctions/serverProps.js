import dbConnect from "../lib/mongooseConect";
import Product from "../models/productSchema";
import Exchange from "../models/Exchange";
import getDbQuery from "../helpersFunctions/getDbQuery";
import {serialize, parse} from "cookie";
import categoryAgregation from "../helpersFunctions/categorysAgregation";

export default async function serverProps({req, res, query}) {
	try {
		await dbConnect();

		let pageNum = query.page ? parseInt(query.page) : 1;

		const searchQuery = {
			categories: query.categories ? query.categories.split(",") : [],
			tags: query.tags ? query.tags.split(",") : [],
			text: query.text ? query.text : ""
		};

		const queryDb = getDbQuery(searchQuery);
		// console.log(queryDb);

		const numOfDocuments = await Product.countDocuments(queryDb);
		if (numOfDocuments <= 12) {
			pageNum = 1;
		}
		const productsRes = await Product.find(queryDb)
			.skip((pageNum - 1) * 12)
			.limit(12)
			.sort([["_id", -1]])
			.exec();
		const categoriesTags = await Product.aggregate(categoryAgregation);

		categoriesTags.forEach((ele) => {
			ele.tags.sort();
		});

		//console.log(queryDb);

		const products = productsRes.map((doc) => {
			const product = doc.toObject();
			product._id = product._id.toString();
			product.file = require(`../productsFiles/${product._id}.json`);
			return product;
		});

		const cookie = req.headers?.cookie;
		const parseCookie = parse(cookie || "");
		const exchangeCookie = parseCookie["exchangeRate"];
		let usaToArs;
		//console.log('cookie: ' + exchangeCookie);

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

		return {props: {products, usaToArs, numOfDocuments, categoriesTags, searchQuery}};
	} catch (err) {
		console.log(err);
	}
}
