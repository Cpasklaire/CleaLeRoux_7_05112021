const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const likeController = require('../controllers/like');

/*POST*/
router.post('/', likeController.createLike);

/*GET*/
router.get('/:postId', likeController.getOneLikePost);
router.get('/user/:userId', likeController.getOneLikeUser);



/*DELETE*/
router.delete('/:id', likeController.deleteLike);

module.exports = router;