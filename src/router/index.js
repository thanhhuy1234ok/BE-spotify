import express from "express";
import { register, login } from "../controllers/auth.controller.js";

const router = express.Router();

// Đăng ký
router.post("/register", register);

// Đăng nhập
router.post("/login", login);

export default router;
