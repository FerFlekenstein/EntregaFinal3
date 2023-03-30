import { Router } from "express";
import jwt from 'jsonwebtoken';
import config from "../config/config.js";
import ProductosM from "../dao/mongo/productos.js";
import { logger } from "../middlewares/logger.js";
const productos = new ProductosM(); 
const router = Router();
router.get('/register', (req, res) => {
    res.render('register');
})
router.get('/', (req, res) => {
    const token = req.cookies[config.jwt.cookie]
    if(token){
        res.redirect(307, '/productos')
    } else {
        res.render('login');
    }
})
router.get("/productos", async (req, res) => {
    const arrProd = await productos.getAll();
    const token = req.cookies[config.jwt.cookie];
    try {
        const user = jwt.verify(token, config.jwt.token)
        res.render("productos", { objetos: arrProd, user: user})
    } catch (error) {
        logger.warn(`Ocurrio un error al verificar el token. ${error}`)
    }
});
export default router;