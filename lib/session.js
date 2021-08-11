import { parse, serialize } from 'cookie';
import { createLoginSession, getLoginSession } from './auth'


function parseCookies(req) {
    // For API Routes we don't need to parse the cookies.
    if (req.cookies) return req.cookies;
  
    // For pages we do need to parse the cookies.
    const cookie = req.headers?.cookie;
    return parse(cookie || '');
}

export default function session({name, secret, cookie: cookieOpts}){
    return async (req, res, next)=>{
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
            let prevCookies= (res.getHeader('Set-Cookie'));
            if(prevCookies !== undefined){
                prevCookies.push(serialize(name, token, cookieOpts));
                res.setHeader('Set-Cookie', prevCookies);
            }else{
                res.setHeader('Set-Cookie', serialize(name, token, cookieOpts));
            }
            oldEnd.apply(this, args);
        }
        
        next();
    }
}