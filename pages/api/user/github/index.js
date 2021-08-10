import nextConnect from "next-connect";
import auth from "../../../../middleware/auth";
import passport from "../../../../lib/passaport";


const handler= nextConnect();

handler.use(auth).get(passport.authenticate('github'));

export default handler;