const studentModel = require("../models/studentModel");

const studentControllers = {
    createStudent: async (req, res) => {
        try {
            const { name, age, grade, email } = req.body;

            const newStudent = new studentModel({
                name,
                age,
                grade,
                email,
            });

            const student = await newStudent.save();

            return res.status(200).json({ message: 'Student created', student });

        } catch (error) {
            res.json({ message: 'Error at creating student', error });
        }
    },

    readStudent: async (req, res) => {
        try {
            const student = await studentModel.findById(req.params.id);

            if (student) {
                res.status(200).json({ student });
            }
            else throw new Error('Student not found');
        } catch (error) {
            res.json({ message: 'Error at finding student', error });
        }
    },
    readAllStudents: async (req, res) => {
        try {
            const students = await studentModel.find();
            return res.status(200).json({ students });
        } catch (error) {
            res.json({ message: 'Error at finding all students' });
        }
    },
    updateStudent: async (req, res) => {
        try {
            const { name, age, grade, email } = req.body;
            const studentUpdated = await studentModel.findByIdAndUpdate(req.params.id, {
                name,
                age,
                grade,
                email,
            });
            res.status(200).json({ message: 'Student updated', studentUpdated });
        } catch (error) {
            res.json({ error: error.message || 'Update failed' });
        }
    },
    deleteStudent: async (req, res) => {
        try {
            const studentDeleted = await studentModel.findByIdAndDelete(req.params.id);
            if (studentDeleted) res.json({ studentDeleted: studentDeleted._id });
            else throw new Error('User not found');
        } catch (error) {
            res.json({ error: error.message || 'Deleting failed' });
        }
    }
}

module.exports = studentControllers;