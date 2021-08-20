import dbConnect from "../../../lib/mongooseConect";
import User from "../../../models/UserSchema";
import crypto from 'crypto';



export default async function singup(req, res){

    const {method, body} = req;

    await dbConnect();

    if(method === 'POST'){
        //console.log(body);
        try {
            
        const userExist= await User.findOne({email: body.email});
        if(userExist){
            res.json({message:'Ya hay un usuario registrado con esta email'});
        }else{
            const salt= crypto.randomBytes(16).toString('hex');
            const hash= crypto.pbkdf2Sync(body.password, salt, 1000, 64, 'sha512').toString('hex');
            const newUser= new User({
                email: body.email,
                salt: salt,
                hash: hash
            });

            await newUser.save();
            res.json({message: 'Usuario creado exitosamente'});   
        }
    } catch (err) {
        console.log(err);
        res.json({message: 'ocurrió un error, inténtelo mas tarde'});
    }
        
    }
}