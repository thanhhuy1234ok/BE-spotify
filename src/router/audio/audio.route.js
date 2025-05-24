import express from 'express';
import multer from 'multer';
import path  from 'path';
import {
    uploadAudio,
    createAudio,
    getAudioAll
} from '../../controllers/audio.Controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';

const router = express.Router();
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (_, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

router.get('/all', getAudioAll);
;
router.post('/upload', authMiddleware, upload.single('audio'), uploadAudio);
router.post('/create', authMiddleware, createAudio);


export default router;
