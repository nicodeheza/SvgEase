import mongoose, { Schema } from 'mongoose';

const UserSchema= mongoose.Schema({
    email: {type: String, required: true},
    hash: {type: String, required: true },
    salt: {type: String, required: true },
    admin: {type: Boolean, default: false},
    userProducts: [{type: Schema.Types.ObjectId, ref:'Product'}]
});

export default mongoose.models.User || mongoose.model('User', UserSchema);