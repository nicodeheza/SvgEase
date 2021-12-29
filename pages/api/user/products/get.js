import nextConnect from "next-connect";
import authenticated from "../../../../middleware/authenticated";
import auth from "../../../../middleware/auth";
import dbConnect from "../../../../lib/mongooseConect";
import Product from "../../../../models/productSchema";

import Mongoose from "mongoose";

const handler = nextConnect();

handler
	.use(auth)
	.use(authenticated)
	.get(async (req, res) => {
		//console.log(req.query);
		const productsId = req.query.id;
		console.log(typeof productsId, productsId);
		try {
			await dbConnect();
			const products = await Product.find({
				_id: {$in: productsId.map((s) => Mongoose.Types.ObjectId(s))}
			});
			let userProducts = [];
			products.forEach((ele) => {
				const obj = {
					_id: ele._id.toString(),
					name: ele.name,
					file: require(`../../../../productsFiles/${ele._id.toString()}.json`)
				};
				userProducts.push(obj);
			});
			res.json({products: userProducts});
		} catch (err) {
			console.log(err);
		}
	});

export default handler;
