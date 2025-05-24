
import express from "express";
import { register, login } from "../controllers/auth.controller.js";

const router = express.Router();
const Audio = require('./audio/audio.route');

router.get('/', (req, res) => {
    res.send('Hello from the router');
});
router.use('/audio', Audio);
// Đăng ký
router.post("/register", register);

// Đăng nhập
router.post("/login", login);

export default router;



