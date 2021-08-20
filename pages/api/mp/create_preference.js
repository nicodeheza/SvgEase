import mercadoPago from 'mercadopago';
import nextConnect from 'next-connect';
import auth from '../../../middleware/auth';
import authenticated from '../../../middleware/authenticated';

mercadoPago.configure({
    access_token: process.env.MP_TEST_ACCESS_TOKEN
  });

  const handler= nextConnect();

  handler
  .use(auth)
  .use(authenticated)
  .post((req, res)=>{
    const {products}= req.body;
    
    //console.log(products);
    const preference={
        items: products,
        back_urls: {
			"success": "http://localhost:3000/api/mp/feedback",
			"failure": "http://localhost:3000/api/mp/feedback",
			"pending": "http://localhost:3000/api/mp/feedback"
		},
		auto_return: 'approved',
    payment_methods:{
      excluded_payment_types:[
        {id:'ticket'},
        {id:'atm'}
      ],
      installments: 1
    }
    };

    mercadoPago.preferences.create(preference)
    .then(response =>{
        res.json({id: response.body.id });
    })
    .catch(err=> console.log(err));
  });

export default handler;
