const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const likeController = require('../controllers/like');

/*POST*/
router.post('/', auth, likeController.createLike);
/*GET*/
router.get('/:postId', auth, likeController.getPostLikes);
/*DELECTE*/
router.delete('/:id', auth, likeController.deleteLike);

module.exports = router;