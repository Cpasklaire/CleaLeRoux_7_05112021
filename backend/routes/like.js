const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const likeCtrl = require('../controllers/like');

//Like
// POST
router.post('/:postId/like', auth, likeCtrl.likePost);
//GET
router.get('/:postId/like', auth, likeCtrl.getAllLike);

module.exports = router;