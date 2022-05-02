const express = require('express');
const router = express.Router();

const commentsCtrl = require('../controllers/commentsController');
const auth = require('../middleware/auth');
const commentOwner = require('../middleware/commentOwner');
const multer = require('../middleware/multer')



router.get('/', commentsCtrl.getAllComments);
router.get('/:id', auth, commentsCtrl.getOneComment);
router.post('/', auth, multer, commentsCtrl.createComments);
router.put('/:id', auth, commentOwner, multer, commentsCtrl.updateComments);
router.delete('/:id', auth, commentOwner, multer, commentsCtrl.deleteComments);

module.exports = router;