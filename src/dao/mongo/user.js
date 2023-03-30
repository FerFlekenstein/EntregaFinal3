import userModel from "./models/userModel.js";
import { logger } from "../../middlewares/logger.js";
class User {
    async save(user) {
        try {
            await userModel.create(user);
            const userDB = await userModel.find(user);
            return userDB
        } catch (error) {
            logger.warn(`Error en User.save ${error}`);
        }
    }
    async getBy(params) {
        try {
            return await userModel.findOne(params)
        } catch (error) {
            logger.warn(`Error en User.getBy ${error}`);
        }
    }
    async getAll() {
        try {
            return await userModel.find({});
        } catch (error) {
            logger.warn(`Error en User.getAll ${error}`);
        }
    }
}
const userService = new User();
export default userService;