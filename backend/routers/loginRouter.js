const express = require('express');
const userControllers = require('../controllers/loginController');
const router = express.Router();

//POST /user/register/
router.post('/register', userControllers.userRegister);

//POST /user/login/
router.post('/login', userControllers.userLogin);


module.exports = router; 