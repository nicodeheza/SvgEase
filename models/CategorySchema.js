import mongoose from 'mongoose';

const CategorySchema= mongoose.Schema({
    name:{type: String, required: true},
    tags:[String]
});

export default mongoose.models.Category || mongoose.model('Category', CategorySchema);