import fs from 'fs';
import dbConnect from "../../../lib/mongooseConect";
import Product from "../../../models/productSchema";
import Category from '../../../models/CategorySchema';

export default async function handler(req, res){
    const {method, body} = req;

    await dbConnect();

    switch(method){
        case 'POST':
            //console.log(body);

            // add product
            let actualProduct;

            try {
                const product= new Product({
                    name: body.name, 
                    category: body.category,
                    tags: body.tags,
                    price: parseFloat(body.price)
                })

                 actualProduct= await product.save();
            } catch (err) {
                if(err){
                    console.log(err);
                    res.json({message:'el producto no pudo ser guardado en la base de datos.'});
                }
            }

            //add categories and tags //
            try {
                const actualCategory= await Category.findOne({name: body.category});
                console.log(actualCategory);
                if(!actualCategory){
                    const newCategory= new Category({
                        name: body.category,
                        tags: body.tags
                    });
                    await newCategory.save();
                }else{
                    if(body.tags.length > 0){
                        
                        if(actualCategory.tags.length > 0){
                            let newTags=[];

                            body.tags.forEach(tag=>{    
                            const result= actualCategory.tags.find(ele=> ele === tag);
                            if(!result){
                                newTags.push(tag);
                            }
                        });
                        actualCategory.tags= actualCategory.tags.concat(newTags);
                       }else{
                           actualCategory.tags= body.tags
                       }

                        await actualCategory.save();
                    }
                }
                
            } catch (err) {

                console.log(err);
                res.json({message:'no se puedo cargar categorías en la base de datos.'});
                
            }


            //save animation file

            const jsonContent= JSON.stringify(body.file);
            fs.writeFile( `./productsFiles/${actualProduct._id}.json` , jsonContent, 'utf8', function(err){
                if(err){
                    res.json({message: 'no se pudo guardar el archivo'});
                    console.log("An error occured while writing JSON Object to File.");
                    return console.log(err);
                }
                console.log("JSON file has been saved.");
            });
       
            res.json({message:'Producto Cargado Exitosamente'});
            break;

        default:
            break;
    }
}