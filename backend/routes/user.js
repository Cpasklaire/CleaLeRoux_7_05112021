const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');

const userController = require('../controllers/user');

/*POST*/
router.post('/signup', multer, userController.signup); //créé
router.post('/login', userController.login); //se connecter
/*GET*/
router.get('/', auth, userController.getProfile); // voir tout les users
router.get('/:id', auth, userController.getProfile); // se voir
router.get('/:role', auth, userController.getProfile); // voir les modo
/*PUT*/
router.put('/:id', auth, multer,  userController.updateProfile); //modifier
/*DELECTE*/
router.delete('/:id', auth, multer, userController.deleteProfile); //supprimer

module.exports = router;