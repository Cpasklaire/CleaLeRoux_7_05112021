const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const commentaireCtrl = require('../controllers/commentaire');

// POST
router.post('/:postId', auth, commentaireCtrl.createCommentaire);
//GET
router.get('/:postId', auth, commentaireCtrl.getAllCommentaires);
//DELETE
router.delete('/:commentaireId', auth, commentaireCtrl.deleteCommentaire);

module.exports = router;