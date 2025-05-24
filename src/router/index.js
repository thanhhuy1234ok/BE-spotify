
import express from "express";
import { register, login } from "../controllers/auth.controller.js";

const router = express.Router();
const Audio = require('./audio/audio.route');


router.use('/audio', Audio);

router.post("/register", register);

router.post("/login", login);

export default router;



