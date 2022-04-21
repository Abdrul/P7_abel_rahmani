const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/userController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const multer = require('../middleware/multer');
const userOwner = require('../middleware/userOwner');



router.get('/', auth, userCtrl.allUsers);
router.get('/:id', auth, userCtrl.oneUser);
router.put('/:id', auth, multer, userCtrl.updateUser);
router.delete('/:id', auth, userCtrl.deleteUser);

module.exports = router;