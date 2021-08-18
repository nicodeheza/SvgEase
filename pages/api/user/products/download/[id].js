import nextConnect from "next-connect";
import auth from '../../../../../middleware/auth';
import authenticated from "../../../../../middleware/authenticated";
import fs from 'fs';

const handler= nextConnect();

handler
.use(auth)
.use(authenticated)
.get((req, res)=>{

    const fileId= req.query.id;
    console.log(fileId);
    if(req.user.userProducts.includes(fileId)){
        const filePath= `./productsFiles/${fileId}.json`;
    
        fs.readFile(filePath, (err, data)=>{
            if(err){
                console.log(err);
                res.end();
            }else{
                res.setHeader('Content-Type', 'application/json');
                res.send(data);
            }
        });

    }else{
        res.status(403).json({message: 'Aun no has comprado este producto, compralo para poder descargarlo'});
    }
});

export default handler;