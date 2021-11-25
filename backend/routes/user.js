const express = require('express');
const router = express.Router();
//const multer = require('../middleware/multer-config');
//const auth = require('../middleware/auth');

const userController = require('../controllers/user');

/*POST*/
router.post('/signup', userController.signup); //créé
router.post('/login', userController.login); //se connecter

/*GET*/
router.get('/', userController.getAllUsers); // voir tout les users ?role=
router.get('/:id',  userController.getOneUser); // se voir

/*PUT*/
router.put('/:id',  userController.modifyUser); //modifier

/*DELETE*/
router.delete('/:id', userController.deleteUser); //supprimer

module.exports = router;