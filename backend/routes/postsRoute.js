const express = require('express');
const router = express.Router();

const postsCtrl = require('../controllers/postsController');
const auth = require('../middleware/auth');
const postOwner = require('../middleware/postOwner');
const multer = require('../middleware/multer');
const admin = require('../middleware/admin');

router.get('/', postsCtrl.getAllPosts);
// router.get('/moderate', auth, admin, postsCtrl.getAllPostsToModerate);
router.get('/:id', auth, postsCtrl.getOnePost);
router.post('/', auth, multer, postsCtrl.createPosts);
router.put('/:id', auth, postOwner, multer, postsCtrl.updatePosts);
// router.put('/moderate/:id', auth, admin, postsCtrl.moderatePosts);
router.delete('/:id', auth, postOwner, postsCtrl.deletePosts);
router.delete('/moderate/:id', auth, admin, postsCtrl.deletePosts);

module.exports = router;