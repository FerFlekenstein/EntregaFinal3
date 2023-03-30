import prodModel from "./models/prodModel.js";
import { logger } from "../../middlewares/logger.js";
class ProductosM {

    async save(obj) {
        try {
            await prodModel.create(obj);
            const prod = await prodModel.find(obj);
            return prod
        } catch (error) {
            logger.error(`error en save: ${error}`)
        }
    }
    async getById(hash) {
        try {
            return await prodModel.findById({ _id: hash });
        } catch (error) {
            logger.error(`error en getById: ${error}`)
        }
    }
    async getAll() {
        try {
            return await prodModel.find({});
        } catch (error) {
            logger.error(`error en getAll: ${error}`)
        }
    }
    async deleteById(hash) {
        try {
            return await prodModel.deleteOne({ _id: hash });
        } catch (error) {
            logger.error(`error en deleteById: ${error}`)
        }
    }
    async deleteAll() {
        try {
            await prodModel.deleteMany({});
        } catch (error) {
            logger.error(`error en deleteAll: ${error}`)
        }
    }
    async update(obj) {
        try {
            const { title, price, thumbnail, id } = obj;
            await prodModel.updateOne({ _id: id }, { title, price, thumbnail })
        } catch (error) {
            logger.error(`error en update: ${error}`)
        }
    }
}
export default ProductosM;