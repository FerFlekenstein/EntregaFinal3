import bcrypt from "bcrypt"
export const createHash = async (password) => {
    const salts = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salts)
}
export const validatePassword = async (password, userPassword) => {
    return bcrypt.compare(password, userPassword);
}