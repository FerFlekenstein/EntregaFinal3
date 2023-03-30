import passport from "passport";
import local from 'passport-local';
import userService from "../dao/mongo/user.js";
import { validatePassword } from "../services/auth.js";
const LocalStrategy = local.Strategy;
const initializeStrategy = () => {
    //passport-local
    passport.use('login', new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
        if (!email || !password) return done(null, false, { message: "Hay campos incompletos!" })
        const user = await userService.getBy({ email })
        if (!user) return done(null, false, { message: "El usuario no es valido" })
        const isValidPassword = await validatePassword(password, user.password)
        if (!isValidPassword) return done(null, false, { message: "Contraseña invalida" })
        return done(null, user)
    }))
}
export default initializeStrategy;