const express = require('express');
const multer = require('multer');
const path = require('path');
const audioController = require('../../controller/audioController');

const router = express.Router();
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (_, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

router.post('/upload', upload.single('audio'), audioController.uploadAudio);

module.exports = router;
