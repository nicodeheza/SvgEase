import mongoose from 'mongoose';

const ProductSchema= new mongoose.Schema({
    name: {type: String, required: true}, 
    category:{type: String, required: true},
    tags: [String],
    price: {type: Number, required: true}
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);