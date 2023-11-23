import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, default: 1 },
}, { timestamps: true });

export default mongoose.model('Cart', CartSchema);
