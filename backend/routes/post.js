const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');//identification
const multer = require('../middleware/multer-config');//images

const postCtrl = require('../controllers/post');

/*POST*/
router.post('/', postCtrl.createPost); //créé un post

/*GET*/
router.get('/', postCtrl.getAllPosts); // tout voir
router.get('/:id', postCtrl.getOnePost); //voir 1 post

/*PUT*/
router.put('/:id', postCtrl.modifyPost); //modifier

/*DELETE*/
router.delete('/:id', postCtrl.deletePost); //supprimer

module.exports = router;