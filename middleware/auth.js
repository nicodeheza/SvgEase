import nextConnect from "next-connect";
import passport from '../lib/passaport';
import session from "../lib/session";

const auth= nextConnect()
.use(
    session({
        name:'sess',
        secret: process.env.TOKEN_SECRET,
        cookie: {
            maxAge:60 * 60 * 8, // 8hours
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            sameSite: 'lax',
        }
    })
)
.use(passport.initialize())
.use(passport.session());

export default auth;


