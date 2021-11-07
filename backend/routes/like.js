const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const likeController = require('../controllers/like');

/*POST*/
router.post('/post/:id/like', auth, likeController.createLike);
/*GET*/
router.get('/post/:id/like', auth, likeController.getPostLikes);
/*DELECTE*/
router.delete('/post/:id/like', auth, likeController.deleteLike);

module.exports = router;