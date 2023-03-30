import { Router } from "express";
import ProductosM from "../dao/mongo/productos.js";
import { executePolicies } from "../middlewares/auth.js";
import uploader from "../services/upload.js";

const router = new Router();
const productos = new ProductosM();

router.get("/", async (req, res, next) => {
    const totalProductos = await productos.getAll()
    res.send(JSON.stringify(totalProductos));
});
router.get("/:id", async (req, res, next) => {
    const { id } = req.params;
    const resultado = await productos.getById(id);
    res.send(JSON.stringify(resultado));
});
router.post("/", uploader.single("thumbnail"), async (req, res, next) => {
    const file = req.file
    const nuevoProd = {
        title: req.body.title,
        price: req.body.price,
        thumbnail : `${req.protocol}://${req.hostname}:${process.env.PORT}/img/${file.filename}`
    }
    const prodBD = await productos.save(nuevoProd);
    res.send(JSON.stringify(prodBD._id));
});
router.put("/:id", async (req, res, next) => {
    if (admin) {
        const { id } = req.params;
        const { title, price, thumbnail } = req.body;
        const productoActualizado = { title, price, thumbnail, id: id };
        await productos.update(productoActualizado);
        res.send(`El producto ${id} fue actualizado`);
    } else {
        const informacion = {
            error: -1,
            descripcion: "ruta /api/productos metodo PUT no autorizada"
        };
        const error = JSON.stringify(informacion, null, 2);
        res.send(error);
    }
});
router.delete("/:id", executePolicies("AUTHENTICATED"), async (req, res, next) => {
    const { id } = req.params;
    const respuesta = await productos.deleteById(id);
    respuesta ? res.send(`El producto con id: ${id} fue eliminado`) : res.json({ error: "producto no encontrado" });
});

export default router;