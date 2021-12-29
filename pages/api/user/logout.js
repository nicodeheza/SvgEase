import nextConnect from "next-connect";
import auth from "../../../middleware/auth";

const handler = nextConnect();

handler.use(auth).get((req, res) => {
	console.log("logOut");
	req.logout();
	res.json({auth: false});
});

export default handler;
