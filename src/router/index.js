import express from "express";
import { register, login } from "../controllers/auth.controller.js";
import Audio from "./audio/audio.route.js";

const router = express.Router();
import audio from "./audio/audio.route.js";

router.post("/register", register);

router.post("/login", login);

router.use("/audio", audio);

export default router;
