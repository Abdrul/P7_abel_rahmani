const express = require('express');
const router = express.Router();

const postsCtrl = require('../controllers/postsController');

router.get('/', postsCtrl.getAllPosts);
router.get('/:id', postsCtrl.getOnePost);
router.post('/', postsCtrl.createPosts);
router.put('/:id', postsCtrl.updatePosts);
router.delete('/:id', postsCtrl.deletePosts);

module.exports = router;