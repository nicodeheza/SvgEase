import nextConnect from "next-connect";
import auth from "../../../middleware/auth";
import authenticated from "../../../middleware/authenticated";
import dbConnect from "../../../lib/mongooseConect";
import User from "../../../models/UserSchema";


const handler= nextConnect();

handler
.use(auth)
.use(authenticated)
.put(async (req, res)=>{
    try {
        await dbConnect();
        const user= await User.findById(req.user._id);
        req.body.productsId.forEach(ele=>{
            user.userProducts.push(ele);
        });
        await user.save();
        res.status(200).json({message: 'add'});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'not add'});
    }
});

export default handler;