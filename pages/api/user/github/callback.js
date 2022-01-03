import nextConnect from "next-connect";
import auth from "../../../../middleware/auth";
import passport from "../../../../lib/passaport";
import {createLoginSession} from "../../../../lib/auth";
import {serialize} from "cookie";

const handler = nextConnect();

handler.use(auth).get(passport.authenticate("github"), async (req, res) => {
	//console.log(req.session);
	const cookieOpts = {
		maxAge: 60 * 60 * 8, // 8hours
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		path: "/",
		sameSite: "lax"
	};
	console.log("create token");
	const token = await createLoginSession(req.session, process.env.TOKEN_SECRET);
	console.log("set cookie");
	res.setHeader("Set-Cookie", serialize("sess", token, cookieOpts));
	console.log("redirect");
	res.redirect("/tienda");
});

export default handler;
