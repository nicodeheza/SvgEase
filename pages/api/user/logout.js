import nextConnect from "next-connect";
import auth from "../../../middleware/auth";

const handler = nextConnect();

handler.use(auth).get((req, res) => {
	console.log("logOut");
	req.logOut();
	res.json({auth: false});
});

export default handler;
