const express = require('express');
const userControllers = require('../controllers/userController');
const router = express.Router();

router.get('/', userControllers.readAllUsers);

router.get('/:id', userControllers.readUser);

router.post('/', userControllers.createUser);

router.put('/:id', userControllers.updateUser);

router.delete('/:id', userControllers.deleteUser);


module.exports = router; 