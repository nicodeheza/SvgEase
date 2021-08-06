import nextConnect from "next-connect";
import auth from '../../../middleware/auth';
import passport from '../../../lib/passaport';

const handler= nextConnect();

handler.use(auth).post(passport.authenticate('local'), (req, res)=>{
    res.json({auth: true});
})

export default handler;
