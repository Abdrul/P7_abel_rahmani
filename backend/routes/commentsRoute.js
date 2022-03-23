const express = require('express');
const router = express.Router();

const commentsCtrl = require('../controllers/commentsController');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer')

router.get('/', auth, commentsCtrl.getAllComments);
router.get('/:id', auth, commentsCtrl.getOneComment);
router.post('/:id', auth, multer, commentsCtrl.createComments);
router.put('/:id', auth, multer, commentsCtrl.updateComments);
router.delete('/:id', auth, commentsCtrl.deleteComments);

module.exports = router;