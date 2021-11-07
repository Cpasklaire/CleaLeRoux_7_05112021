const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');

const userController = require('../controllers/user');

/*POST*/
router.post('/api/auth/signup', multer, userController.signup); //créé
router.post('/api/auth/login', userController.login); //se connecter
/*GET*/
router.get('/user/:id', auth, userController.getProfile); // se voir
router.get('/user/', auth, userController.getProfile); // voir tout les users
router.get('/user/:role', auth, userController.getProfile); // voir les modo
/*PUT*/
router.put('/user/:id', auth, multer,  userController.updateProfile); //modifier
/*DELECTE*/
router.delete('/user/:id', auth, multer, userController.deleteProfile); //supprimer

module.exports = router;