import nextConnect from "next-connect";
import auth from "../../../../middleware/auth";
import passport from "../../../../lib/passaport";

const handler = nextConnect();

handler.use(auth).get(passport.authenticate("github"), (req, res) => {
	// res.redirect("/tienda") don't work in netlify
	res.status(200).send(`<script>window.location.href = '/tienda'</script>`);
});

export default handler;
