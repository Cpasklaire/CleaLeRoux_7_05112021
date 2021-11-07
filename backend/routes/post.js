const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');//identification
const multer = require('../middleware/multer-config');//images

const postCtrl = require('../controllers/post');

/*POST*/
router.post('/', auth, multer, postCtrl.createPost); //créé un post
/*GET*/
router.get('/', auth, postCtrl.getAllPost); // tout voir
router.get('/:id', auth, postCtrl.getOnePost); //voir 1 post
router.get('/:createDate', auth, postCtrl.getNewPost); // voir non lu
router.get('/:message', auth, postCtrl.getTextPost); // voir texte
router.get('/:imageURL', auth, postCtrl.getPicturePost); // voir image
router.get('/:userId', auth, postCtrl.getOnePost); // voir les posts d'un user
/*PUT*/
router.put('/:id', auth, multer, postCtrl.modifyPost); //modifier
/*DELECT*/
router.delete('/:id', auth, postCtrl.deletePost); //supprimer

module.exports = router;