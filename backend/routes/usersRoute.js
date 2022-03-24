const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/userController');
const auth = require('../middleware/auth');


router.get('/', auth, userCtrl.allUsers);
router.get('/:id', auth, userCtrl.oneUser);

module.exports = router;