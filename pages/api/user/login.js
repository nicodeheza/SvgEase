import nextConnect from "next-connect";
import auth from "../../../middleware/auth";
import passport from "../../../lib/passaport";
import {getUserProducts} from "../../../lib/users";

const handler = nextConnect();

handler.use(auth).post(passport.authenticate("local"), async (req, res) => {
	const userProducts = await getUserProducts(req.body.email);
	res.json({auth: true, userProducts});
});

export default handler;
