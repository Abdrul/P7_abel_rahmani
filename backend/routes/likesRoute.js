const express = require('express');
const router = express.Router();

const likeCtrl = require('../controllers/likeController');
const auth = require('../middleware/auth');


router.post('/like', auth,likeCtrl.like);
router.post('/unlike', auth, likeCtrl.unlike);

module.exports = router;
