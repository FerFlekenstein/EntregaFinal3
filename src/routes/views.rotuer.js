import { Router } from "express";
const router = Router();
router.get('/register', (req, res) => {
    res.render('register');
})
router.get('/', (req, res) => {
    res.render('login')
})
export default router;