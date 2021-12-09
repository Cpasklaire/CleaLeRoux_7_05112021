const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// POST
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
// GET
router.get('/:id', auth, userCtrl.getUserProfile);
// PUT
router.put('/:id', auth, multer, userCtrl.modifyUserProfile);
// DELETE
router.delete('/:id', auth, userCtrl.deleteAccount);

module.exports = router;