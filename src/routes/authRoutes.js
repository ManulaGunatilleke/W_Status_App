const express = require('express');
const router = express.Router();

const { adminRegister, userRegister, loginUser} = require('../controllers/authController');

// Admin create account
router.post('/createAdmin', adminRegister);

// User registering
router.post('/registerUser',userRegister);

// Login a user
router.post('/login',loginUser);


module.exports = router;