import User from '../models/UserSchema';
import dbConnect from './mongooseConect';
import crypto from 'crypto';


export async function findUserById(id){
    dbConnect();
    return await User.findById(id);
}

export async function findUserByEmail(email){
    dbConnect();
    return await User.findOne({email: email});
}

export function  validatePassword(user, inputPassword){
    const inputHash= crypto.pbkdf2Sync(inputPassword, user.salt, 1000, 64, 'sha512').toString('hex');
    const passwordMatch= user.hash === inputHash;
    return passwordMatch ;
}