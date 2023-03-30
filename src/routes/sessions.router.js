import jwt from "jsonwebtoken";
import passport from "passport";
import { Router } from "express";
import config from "../config/config.js";
import uploader from "../services/upload.js";
import userService from "../dao/mongo/user.js";
import { createHash } from "../services/auth.js";
import { transporter } from "../services/mailing.js";
const router = Router();
router.post('/register', uploader.single('foto'), async (req, res) => {
    const file = req.file;
    if (!file) return res.status(500).send({ status: "error", error: "Error al guardar el archivo" })
    const { nombre, apellido, email, password } = req.body;
    if (!nombre || !email || !password) return res.status(400).send({ status: "error", error: "Valores incompletos" });
    const userExists = await userService.getBy({ email });
    if (userExists) return res.status(400).send({ status: "error", error: "El usuario ya existe" });
    const hashedPassword = await createHash(password);
    const user = {
        nombre: nombre,
        apellido: apellido,
        email: email,
        password: hashedPassword,
        avatar: `${req.protocol}://${req.hostname}:${process.env.PORT}/img/${file.filename}`
    }
    await userService.save(user)
    const result = await transporter.sendMail({
        from:`Entrega Final 3 - Fer <${config.app.GMAIL_USER}>`,
        to: config.app.GMAIL_ADMIN,
        subject:`Nuevo usuario`,
        html: `Se registró un nuevo usuario, aqui tienes algunos de sus datos (no lo doxees). Su nombre es: ${nombre} ${apellido}, y su email: ${email}`
    })
    res.send({ status: "success", message: "Registro hecho exitosamente."})
});
router.post('/', passport.authenticate("login", {failureRedirect: "/fail", session: false}), async (req, res) => {
    try {
        const user = req.user
        const userToken = {
            id: user._id,
            email: user.email,
            nombre: user.nombre,
            avatar: user.avatar
        }
        const token = jwt.sign(userToken, config.jwt.token, { expiresIn: "1d" })
        res.cookie(config.jwt.cookie, token, {maxAge: 86400000}).send({status:"success", message:"logged in"})
    } catch (error) {
        res.status(500).send({ status: "error", message: "Error del server" })
    }
});
router.get("/fail", (req, res) => {
    res.clearCookie(config.jwt.cookie)
    res.render("fail")
});
router.get('/logout', (req, res) => {
    try {
        res.clearCookie(config.jwt.cookie)
        res.redirect('/')
    } catch (error) {
        logger.warn(`error en ${req.url} info del error: ${error}`)
    }
});
export default router;