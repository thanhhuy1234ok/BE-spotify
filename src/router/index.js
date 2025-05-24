const router = require('express').Router();
const Audio = require('./audio/audio.route');

router.get('/', (req, res) => {
    res.send('Hello from the router');
}); 
router.use('/audio', Audio);
module.exports = router;