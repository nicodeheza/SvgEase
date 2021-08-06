import { parse, serialize } from 'cookie';
import { createLoginSession, getLoginSession } from './auth';

function parseCookies(req) {
    // For API Routes we don't need to parse the cookies.
    if (req.cookies) return req.cookies;
  
    // For pages we do need to parse the cookies.
    const cookie = req.headers?.cookie;
    return parse(cookie || '');
}

export default async function getSession(req, res){

        const name= 'sess';
        const secret= process.env.TOKEN_SECRET;
        const cookieOpts= {
            maxAge:60 * 60 * 8, // 8hours
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            sameSite: 'lax',
        }

    const cookies= parseCookies(req);
        const token= cookies[name];
        let unsealed = {}
        if(token){
            try {
                unsealed= await getLoginSession(token, secret);
            } catch (err) {
                console.log(err);
            }
        }

        req.session= unsealed;

        const oldEnd= res.end;
        res.end= async function resEndProxy(...args){
            if(res.finished || res.writableEnded || res.headersSent) return;
            if (cookieOpts.maxAge) {
                req.session.maxAge = cookieOpts.maxAge
            }
            const token= await createLoginSession(req.session, secret);

            res.setHeader('Set-Cookie', serialize(name, token, cookieOpts));
            oldEnd.apply(this, args);
            res.end();
        }

    }
