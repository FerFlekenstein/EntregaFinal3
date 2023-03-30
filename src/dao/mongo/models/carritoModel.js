import mongoose from "mongoose";
const cartSchema = new mongoose.Schema({
    usuario: { type: String, required: true, unique: true },
    productos: { type: Array, required: true },
})
const cartModel = mongoose.model('Carritos', cartSchema);
export default cartModel;