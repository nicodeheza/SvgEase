import nextConnect from 'next-connect';
import auth from '../../../middleware/auth';
import authenticated from '../../../middleware/authenticated';
import dbConnect from '../../../lib/mongooseConect';
import User from '../../../models/UserSchema';

const handler= nextConnect();

handler
.use(auth)
.use(authenticated)
.get(async (req, res)=>{
    // console.log({
	// 	Payment: req.query.payment_id,
	// 	Status: req.query.status,
	// 	MerchantOrder: req.query.merchant_order_id,
    //     externalReference: req.query.external_reference	
	// });
    try {
        await dbConnect();
        if(req.query.status === 'approved'){
        const response= await fetch(`https://api.mercadopago.com/merchant_orders/search?preference_id=${req.query.preference_id}`,{
            method: 'GET',
            headers:{
                'Authorization': `Bearer ${process.env.MP_TEST_ACCESS_TOKEN}`,
                'Accept': 'application/json',
            }
        });
        const preference = await response.json();
        //console.log(preference.elements[0].items);

        const user= await User.findById(req.user._id);

        preference.elements[0].items.forEach(ele=>{
            user.userProducts.push(ele.id);
        });
            //console.log(userProducts);
            await user.save();

        }

        res.redirect('/tienda');
    
        
    } catch (err) {
        console.log(err);
    }
})

export default handler;