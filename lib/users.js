import User from '../models/UserSchema';
import dbConnect from './mongooseConect';
import crypto from 'crypto';


export async function findUserById(id){
    await dbConnect();
    return await User.findById(id);
}

export async function findUserByEmail(email){
    await dbConnect();
    return await User.findOne({email: email});
}

export function  validatePassword(user, inputPassword){
    if(user.salt && user.hash){
        const inputHash= crypto.pbkdf2Sync(inputPassword, user.salt, 1000, 64, 'sha512').toString('hex');
        const passwordMatch= user.hash === inputHash;
        return passwordMatch ;
    }else{
        return false;
    }
}

export async function findOrCreateGitHub(profile){
    const email= profile.emails[0].value;
    await dbConnect();
    const user= await User.findOne({email: email});
    if(user){
        return user;
    }else{
        const newUser= new User({
            email: email
        });

        return await newUser.save();
    }
}

export async function getUserProducts(email){
    await dbConnect();
    const user= await User.findOne({email: email});
    const userPro= user.userProducts;
    const userProducts= userPro.map(id=>{
        return id.toString();
    });
    return userProducts
}