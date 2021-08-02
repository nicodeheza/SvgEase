import fs from 'fs';
import dbConnect from "../../../lib/mongooseConect";
import Product from "../../../models/productSchema";

export const config = {
    api: {
      bodyParser: {
        sizeLimit: '2mb',
      },
    },
  }

export default async function handler(req, res){
    const {method, body} = req;

    function saveJson(id){
        const jsonContent= JSON.stringify(body.file);
        fs.writeFile( `./productsFiles/${id}.json` , jsonContent, 'utf8', function(err){
            if(err){
                res.json({message: 'no se pudo guardar el archivo'});
                console.log("An error occured while writing JSON Object to File.");
                return console.log(err);
            }
            console.log("JSON file has been saved.");
        });
    }

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

          

            //save animation file
            saveJson(actualProduct._id);
       
            res.json({message:'Producto Cargado Exitosamente'});
            break;

        case 'PUT':
            //console.log(body);
            try {
                const product= await Product.findByIdAndUpdate(body.id, {
                    name: body.name,
                    category: body.category,
                    tags: body.tags,
                    price: parseFloat(body.price)
                }, {new:true});
                //console.log(product)

                if(body.file){
                    saveJson(product._id);
                }

                res.json({message:'Producto actualizado exitosamente.'});

  
            } catch (err) {
                console.log(err);
                res.json({message:'Algo salio mal, vuelva a intentarlo mas tarde.'});
            }

        break;

        case 'DELETE':
                fs.unlink(`./productsFiles/${body.id}.json`,(err)=>{
                    if(err){
                        console.log(err);
                        res.json({message: 'No se pudo eliminar el archivo.'});
                    }
                    console.log(`${body.id}.json deleted`);
                    Product.findByIdAndDelete(body.id, (err)=>{
                        if(err){
                            console.log(err);
                            res.json({message:'No se puedo eliminar el producto de la bace de datos'});
                        }

                        res.json({message:'Producto eliminado exitosamente.'});
                    });
                });
           
            break;

        case 'GET':
            try {
                const products= await Product.find({});
                res.json(products);
            } catch (err) {
                console.log(err);
            }
            break;

        default:
            break;
    }
}