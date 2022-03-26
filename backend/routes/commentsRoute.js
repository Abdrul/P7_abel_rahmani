const express = require('express');
const router = express.Router();

const commentsCtrl = require('../controllers/commentsController');
const auth = require('../middleware/auth');
const commentOwner = require('../middleware/commentOwner');


router.get('/', auth, commentsCtrl.getAllComments);
router.get('/:id', auth, commentsCtrl.getOneComment);
router.post('/', auth, commentsCtrl.createComments);
router.put('/:id', auth, commentOwner, commentsCtrl.updateComments);
router.delete('/:id', auth, commentOwner, commentsCtrl.deleteComments);

module.exports = router;