import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: String,
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    avatar: String
})
const userModel = mongoose.model('Usuarios', userSchema);
export default userModel;