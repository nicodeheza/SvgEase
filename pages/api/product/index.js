import fs from "fs";
import dbConnect from "../../../lib/mongooseConect";
import Product from "../../../models/productSchema";
import nextConnect from "next-connect";
import auth from "../../../middleware/auth";
import adminAuth from "../../../middleware/adminAuth";

export const config = {
	api: {
		bodyParser: {
			sizeLimit: "2mb"
		}
	}
};

const handler = nextConnect();

handler
	.use(auth)
	.use(adminAuth)
	.post(async (req, res) => {
		await dbConnect();
		const body = req.body;
		// add product
		let actualProduct;

		try {
			const product = new Product({
				name: body.name,
				category: body.category,
				tags: body.tags,
				price: parseFloat(body.price),
				data: JSON.stringify(body.file)
			});

			actualProduct = await product.save();

			res.json({message: "Producto Cargado Exitosamente"});
		} catch (err) {
			if (err) {
				console.log(err);
				res.json({message: "el producto no pudo ser guardado en la base de datos."});
			}
		}
	})
	.put(async (req, res) => {
		const body = req.body;
		console.log(body);
		//todo

		try {
			await dbConnect();
			const product = await Product.findByIdAndUpdate(
				body.id,
				{
					name: body.name,
					category: body.category,
					tags: body.tags,
					price: parseFloat(body.price),
					data: JSON.stringify(body.file)
				},
				{new: true}
			);
			//console.log(product)

			res.json({message: "Producto actualizado exitosamente."});
		} catch (err) {
			console.log(err);
			res.json({message: "Algo salio mal, vuelva a intentarlo mas tarde."});
		}
	})
	.delete(async (req, res) => {
		const body = req.body;
		await dbConnect();
		Product.findByIdAndDelete(body.id, (err) => {
			if (err) {
				console.log(err);
				res.json({message: "No se puedo eliminar el producto de la bace de datos"});
			}

			res.json({message: "Producto eliminado exitosamente."});
		});
	});

export default handler;
