import nextConnect from "next-connect";
import auth from "../../../../middleware/auth";
import passport from "../../../../lib/passaport";
import {createLoginSession} from "../../../../lib/auth";
import {serialize} from "cookie";

const handler = nextConnect();

handler.use(auth).get(passport.authenticate("github"), (req, res) => {
	//console.log(req.session);
	//try {
	// const cookieOpts = {
	// 	maxAge: 60 * 60 * 8, // 8hours
	// 	httpOnly: true,
	// 	secure: process.env.NODE_ENV === "production",
	// 	path: "/",
	// 	sameSite: "lax"
	// };
	// const token = await createLoginSession(req.session, process.env.TOKEN_SECRET);
	// res.setHeader("Set-Cookie", serialize("sess", token, cookieOpts));
	res.redirect(307, "/tienda");
	// } catch (err) {
	// 	res.status(500).send({error: "failed to login with github"});
	// }
});

export default handler;
