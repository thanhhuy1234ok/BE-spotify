import express from "express";
import { register, login } from "../controllers/auth.controller.js";
import Audio from './audio/audio.route.js';

const router = express.Router();

router.use('/audio', Audio);

router.post("/register", register);

router.post("/login", login);

export default router;



