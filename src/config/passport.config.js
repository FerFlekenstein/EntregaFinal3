import passport from "passport";
import local from 'passport-local';
import userService from "../dao/mongo/user.js";
import { validatePassword } from "../services/auth.js";
import GithubStrategy from 'passport-github2';
import config from "./config.js";
const LocalStrategy = local.Strategy;
const initializeStrategy = () => {
    //passport-local
    passport.use('login', new LocalStrategy({usernameField: "email"}, async(email, password, done) => {
    if (!email || !password) return done(null, false, {message: "Hay campos incompletos!"})
    const user = await userService.getBy({email})
    if (!user) return done(null, false, {message: "El usuario no es valido"})
    const isValidPassword = await validatePassword(password, user.password)
    if(!isValidPassword) return done(null, false, {message: "Contraseña invalida"})
    return done(null, user)
    }))
    //passport-github
    passport.use('github', new GithubStrategy({
        clientID: config.github.clientID,
        clientSecret: config.github.secret,
        callBackURL: 'http://localhost:8080/login/githubcallback'
    }, async(accessToken, refreshToken, profile, done) => {
        try {
            const {email, name} = profile._json;
            console.log(profile);
            const user = await userService.getBy({email: email})
            if(!user){
                const newUser = {
                    nombre: name,
                    email: email,
                    password: '123'
                }
                const result = await userService.save(newUser);
                return done(null, result);
            }
            done(null,user)
        } catch (error) {
            done(error)
        }
    }))
}
export default initializeStrategy;