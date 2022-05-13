const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/authController');
const password = require('../middleware/password');
const multer = require('../middleware/multer');



router.post('/signup', password, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;