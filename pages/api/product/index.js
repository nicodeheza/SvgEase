import fs from 'fs';
import dbConnect from "../../../lib/mongooseConect";
import Product from "../../../models/productSchema";
import nextConnect from 'next-connect';
import auth from '../../../middleware/auth';
import adminAuth from '../../../middleware/adminAuth';

export const config = {
    api: {
      bodyParser: {
        sizeLimit: '2mb',
      },
    },
  }

  function saveJson(id, body){
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

  const handler= nextConnect();

  handler.use(auth)
  .use(adminAuth)
  .post(async(req, res)=>{

    await dbConnect();
    const body= req.body;
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
      saveJson(actualProduct._id, body);
 
      res.json({message:'Producto Cargado Exitosamente'});

  })
  .put(async (req, res)=>{

    const body= req.body;

      try {
        await dbConnect();
        const product= await Product.findByIdAndUpdate(body.id, {
            name: body.name,
            category: body.category,
            tags: body.tags,
            price: parseFloat(body.price)
        }, {new:true});
        //console.log(product)

        if(body.file){
            saveJson(product._id, body);
        }

        res.json({message:'Producto actualizado exitosamente.'});


    } catch (err) {
        console.log(err);
        res.json({message:'Algo salio mal, vuelva a intentarlo mas tarde.'});
    }
  })
  .delete(async (req, res)=>{

    const body= req.body;
    await dbConnect();
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
  });
  
  export default handler;
