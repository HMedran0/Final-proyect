const express = require('express');
const studentControllers = require('../controllers/studentController');
const router = express.Router();

router.get('/', studentControllers.readAllStudents);

router.get('/:id', studentControllers.readStudent);

router.post('/', studentControllers.createStudent);

router.put('/:id', studentControllers.updateStudent);

router.delete('/:id', studentControllers.deleteStudent);


module.exports = router; 