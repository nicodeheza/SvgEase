import nextConnect from "next-connect";
import auth from "../../middleware/auth";
import {serialize} from 'cookie';

const handler= nextConnect();

handler
.use(auth)
.get(async (req, res)=>{
    const cookie= req.cookies;
   // console.log(cookie);
    const exchangeCookie= cookie['exchangeRate'];
    let usaToArs;

    if(!exchangeCookie){
        const exchangeRateRes= await fetch(`https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_API_KEY}/pair/USD/ARS`);
        const exchangeRate= await exchangeRateRes.json();
        usaToArs= exchangeRate.conversion_rate;
        // usaToArs= 100;
        // usaToArs= usaToArs.toString();
        console.log('exchange');

        const now= new Date();
        const newCookie= serialize('exchangeRate', usaToArs,{
            expires:new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 10, 0, 0, 0),
            httpOnly: true,
            path:'/',
            sameSite:'lax',
            secure: process.env.NODE_ENV === 'production',
        });
        res.setHeader('Set-Cookie', [newCookie]);
        //res.end()

    }else{
        usaToArs=parseFloat(exchangeCookie);
    }

    if(req.isAuthenticated()){
        res.json({auth: true, usaToArs});
    }else{
        res.json({auth: false, usaToArs});
    }
});

export default handler;