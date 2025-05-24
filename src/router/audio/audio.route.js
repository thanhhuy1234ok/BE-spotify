import express from "express";
import multer from "multer";
import path from "path";
import { uploadAudio } from "../../controllers/audio.controller.js";

const router = express.Router();
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (_, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

router.post("/upload", upload.single("audio"), uploadAudio);

export default router;
