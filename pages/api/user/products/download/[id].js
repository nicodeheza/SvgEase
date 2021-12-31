import nextConnect from "next-connect";
import auth from "../../../../../middleware/auth";
import authenticated from "../../../../../middleware/authenticated";
import Product from "../../../../../models/productSchema";
import dbConnect from "../../../../../lib/mongooseConect";

const handler = nextConnect();

handler
	.use(auth)
	.use(authenticated)
	.get(async (req, res) => {
		const fileId = req.query.id;

		if (req.user.userProducts.includes(fileId)) {
			try {
				await dbConnect();
				const product = await Product.findById(fileId);
				const file = Buffer.from(product.data);
				res.setHeader("Content-Type", "application/json");
				res.send(file);
			} catch (err) {
				if (err) {
					console.log(err);
					res.status(500).json({message: "server error"});
				}
			}
		} else {
			res.status(403).json({
				message: "Aun no has comprado este producto, compralo para poder descargarlo"
			});
		}
	});

export default handler;
