const bcrypt = require('bcrypt')
const userModel = require("../models/userModel");
const getToken = require('../helper/gets')


const userControllers = {
    createUser: async (req, res) => {
        try {
            const { name, last_name, age, company, email, password } = req.body;

            const hashPassword = await bcrypt.hash(password, 10);

            const newUser = new userModel({
                name,
                last_name,
                age,
                company,
                email,
                password: hashPassword,
                role,
            });

            const createdUser = await newUser.save();

            const token = await getToken({
                id: user._id,
                name: user.name,
            });

            return res.status(200).json({ token, createdUser });

        } catch (error) {
            res.json({ message: 'Error at creating student', error });
        }
    },

    readUser: async (req, res) => {
        try {
            const user = await userModel.findById(req.params.id);

            if (User) {
                res.status(200).json({ user });
            }
            else throw new Error('Student not found');
        } catch (error) {
            res.json({ message: 'Error at finding student', error });
        }
    },

    readAllUsers: async (req, res) => {
        try {
            const users = await userModel.find();
            return res.status(200).json({ users });
        } catch (error) {
            res.json({ message: 'Error at finding all users' });
        }
    },
    
    updateUser: async (req, res) => {
        try {
            const { name, last_name, age, company, email, role } = req.body;
            const userUpdated = await userModel.findByIdAndUpdate(req.params.id, {
                name,
                last_name,
                age,
                company,
                email,
                role,
            });
            res.status(200).json({ message: 'Student updated', userUpdated });
        } catch (error) {
            res.json({ error: error.message || 'Update failed' });
        }
    },
    deleteUser: async (req, res) => {
        try {
            const userDeleted = await userModel.findByIdAndDelete(req.params.id);
            if (userDeleted) res.json({ userDeleted: userDeleted._id });
            else throw new Error('User not found');
        } catch (error) {
            res.json({ error: error.message || 'Deleting failed' });
        }
    }
}

module.exports = userControllers;