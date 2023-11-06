import mongoose from "mongoose";

const ProductsSchema = new mongoose.Schema({
    title: { type: String, required: true},
    description: { type: String, required: true},
    price: { type: Number, required: true},
    code: { type: String, required: true, unique: true},
    stock: { type: Number, required: true}
}, { timestamps: true});

export default mongoose.model('products', ProductsSchema);
