import { Router } from "express";
import jwt from "jsonwebtoken";
import passport from "passport";
import config from "../config/config.js";
import uploader from "../services/upload.js";
import userService from "../dao/mongo/user.js";
const router = Router();
router.post('/register', uploader.single('avatar'), async(req, res) => {
    const file = req.file;
    if(!file) return res.status(500).send({status: "error", error: "Error al guardar el archivo"})
    const { nombre, apellido, email, password } = req.body;
    if (!nombre || !email || !password) return res.status(400).send({ status: "error", error: "Valores incompletos" });
    const userExists = await userService.getBy({ email });
    if (userExists) return res.status(400).send({ status: "error", error: "El usuario ya existe" });
    const hashedPassword = await createHash(password);
    const user = {
        nombre,
        apellido,
        email,
        password: hashedPassword,
        avatar: `${req.protocol}://${req.hostname}:${process.env.PORT}/images/${file.filename}`
    }
    const result = await userService.save({user})
    res.send({ status: "success", message: "Registrado exitosamente"});
});
router.post('/', passport.authenticate('login', {failureRedirect: "/fail",session: false,failureMessage: true,}), async (req, res) => {
    try {
        const user = req.user
        const userToken = {
            id: user._id,
            email: user.email,
            nombre: user.nombre,
            avatar: user.avatar
        }
        const token = jwt.sign(userToken, config.jwt.token, {expiresIn: "1d"})
        res.cookie(config.jwt.cookie, token).send({status: "success", message: "logeado"})
    } catch (error) {
        res.status(500).send({status: "error", error: "Error del server"})
    }
});
router.get("/fail", (req, res) => {
    if(req.session.messages.length>4) return res.status(400).send({message:"se paso de intentos"})
    res.status(400).send({status:"error",error:"Error de autenticación"})
});
router.get('/logout', (req,res)=>{
    try {
        res.clearCookie(config.jwt.cookie)
        setTimeout(() => {
            res.redirect('/')
        }, 1000)
    } catch (error) {
        logger.warn(`error en ${req.url} info del error: ${error}`)
    }
});
router.get('/github',passport.authenticate('github'),(req,res)=>{});
router.get('/login/githubcallback', passport.authenticate('github'), (req, res) => {
    console.log(req.user);
    const user = req.user
    const userToken = {
        id: user._id,
        email: user.email,
        nombre: user.nombre,
        // avatar: user.avatar
    }
    const token = jwt.sign(userToken, config.jwt.token, {expiresIn: "1d"})
    res.cookie(config.jwt.cookie, token).send({status: "success", message: "logeado"})
    res.redirect('/')
});
export default router;