import cartModel from "./models/carritoModel.js";
import prodModel from "./models/prodModel.js";
import { logger } from "../../middlewares/logger.js";
class CarritoM {

    async createCart(email) {
        try {
            const cart = { usuario: email, productos: [] }
            await cartModel.create(cart);
            return await cartModel.find(cart)._id
        } catch (error) {
            logger.warn(`error en createCart: ${error}`)
            return error
        }
    }
    async getCart(email) {
        try {
            const cart = await cartModel.findOne({ usuario: email });
            return cart
        } catch (error) {
            logger.warn(`error en getCart: ${error}`)
            return false
        }
    }
    async deleteById(id) {
        try {
            await cartModel.findByIdAndDelete({ _id: id })
        } catch (error) {
            logger.warn(`error en deleteById: ${error}`)
        }
    }
    async saveProduct(idCart, idProduct) {
        try {
            const cart = await cartModel.findById({ _id: idCart });
            const prod = await prodModel.findById({ _id: idProduct });
            const hayItem = cart.productos.some((item) => item._id === prod._id);
            hayItem ? console.log("Ya existe ese producto en el carrito") : cart.productos.push(prod);
            await cartModel.updateOne({ _id: idCart }, { productos: cart.productos });
        } catch (error) {
            logger.warn(`error en saveProduct: ${error}`)
        }
    }
    async delProdById(idCart, idProduct) {
        try {
            const cart = await cartModel.findById({ _id: idCart });
            const prod = await prodModel.findById({ _id: idProduct });
            const hayItem = cart.productos.some((item) => item._id === prod._id);
            if (hayItem) {
                const indice = cart.productos.indexOf(prod);
                cart.productos.splice(indice, 1);
                await cartModel.updateOne({ _id: idCart }, { productos: cart.productos });
            } else {
                console.log("No existe ese producto en el carrito");
            }
        } catch (error) {
            logger.warn(`error en delProdById: ${error}`)
        }
    }
}
export default CarritoM;