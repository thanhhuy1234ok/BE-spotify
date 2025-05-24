const express = require('express');
const multer = require('multer');
const path = require('path');
const audioController = require('../../controllers/audio.Controller');
const authMiddleware = require('../../middlewares/auth.middleware');

const router = express.Router();
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (_, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

router.get('/all', audioController.getAudioAll);

router.use(authMiddleware());
router.post('/upload', upload.single('audio'), audioController.uploadAudio);
router.post('/create',audioController.createAudio);

module.exports = router;
