const express = require('express');
const router = express.Router();

const postsCtrl = require('../controllers/postsController');
const auth = require('../middleware/auth');
const postOwner = require('../middleware/postOwner');
const multer = require('../middleware/multer')

router.get('/', postsCtrl.getAllPosts);
router.get('/:id', auth, postsCtrl.getOnePost);
router.post('/', auth, multer, postsCtrl.createPosts);
router.put('/:id', auth, postOwner, multer, postsCtrl.updatePosts);
router.delete('/:id', auth, postOwner, postsCtrl.deletePosts);

module.exports = router;