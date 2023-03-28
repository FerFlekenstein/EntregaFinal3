import mongoose from "mongoose";
const prodSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number },
    thumbnail: { type: String, required: true }
})
const prodModel = mongoose.model('Productos', prodSchema);
export default prodModel;