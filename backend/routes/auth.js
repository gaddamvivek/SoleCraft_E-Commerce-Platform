const express = require('express');
const router = express.Router();
const RegisterCntrl = require('../controllers/registerController');
const UserCntrl = require('../controllers/userController');
const { forgetPassword } = require('../controllers/registerController');
const { login } = require('../controllers/registerController');

router.post('/login', login);
router.post('/forgetpassword', forgetPassword);
router.post('/register', RegisterCntrl.registerUser);
router.put('/update/:userId', UserCntrl.updateUserData);

module.exports = router;
