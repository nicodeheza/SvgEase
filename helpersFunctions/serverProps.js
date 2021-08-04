import dbConnect from "../lib/mongooseConect";
import Product from "../models/productSchema";
import getDbQuery from "../helpersFunctions/getDbQuery";
import Cookies from 'cookies';
import categoryAgregation from '../helpersFunctions/categorysAgregation';

export default async function serverProps({req, res, query}){
    
    await dbConnect();

    let pageNum= query.page ? parseInt(query.page) : 1;

    const searchQuery={
        categories: query.categories ? query.categories.split(',') : [] ,
        tags: query.tags ? query.tags.split(',') : [],
        text: query.text ? query.text : ''
    }

    const queryDb= getDbQuery(searchQuery);

    const numOfDocuments= await Product.countDocuments(queryDb);
    if(numOfDocuments <= 12){
        pageNum= 1;
    }
    const productsRes= await Product.find(queryDb).skip( (pageNum-1) * 12).limit(12).sort([['_id', -1]]).exec();
    const categoriesTags= await Product.aggregate(categoryAgregation);

    categoriesTags.forEach(ele=>{
        ele.tags.sort();
    });

    //console.log(queryDb);

    const products= productsRes.map(doc=>{
        const product= doc.toObject();
        product._id= product._id.toString();
        product.file= require(`../productsFiles/${product._id}.json`);
        return product;
    });

    const cookie= new Cookies(req, res);

    const exchangeCookie= cookie.get('exchangeRate');
    let usaToArs;

    if(!exchangeCookie){
        const exchangeRateRes= await fetch(`https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_API_KEY}/pair/USD/ARS`);
        const exchangeRate= await exchangeRateRes.json();
        usaToArs= exchangeRate.conversion_rate;

        const now= new Date();
        cookie.set('exchangeRate', usaToArs.toString(),{
            httpOnly: true,
            expires: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 10, 0, 0, 0)
        });
        console.log('exchange');
    }else{
        usaToArs= parseFloat(exchangeCookie);
       // console.log(exchangeCookie)
    }

    return {props: {products, usaToArs, numOfDocuments, categoriesTags, searchQuery}}

}