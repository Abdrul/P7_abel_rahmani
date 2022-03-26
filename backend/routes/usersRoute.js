const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/userController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin')


router.get('/', auth, admin, userCtrl.allUsers);
router.get('/:id', auth, userCtrl.oneUser);

module.exports = router;