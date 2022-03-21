const express = require('express');
const router = express.Router();

const postsCtrl = require('../controllers/postsController');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer')

router.get('/', auth, postsCtrl.getAllPosts);
router.get('/:id', auth, postsCtrl.getOnePost);
router.post('/', auth, multer, postsCtrl.createPosts);
router.put('/:id', auth, multer, postsCtrl.updatePosts);
router.delete('/:id', auth, postsCtrl.deletePosts);

module.exports = router;