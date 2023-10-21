const bcrypt = require('bcrypt');
const userModel = require("../models/userModel");
const getToken = require('../helper/gets');


const loginControllers = {
    userRegister: async (req, res) => {
        try {
            req.body.password = bcrypt.hashSync(req.body.password, 10);

            const user = await userModel.create(req.body);
            res.json(user);

        } catch (error) {
            res.json({ error: error.message });
        }
    },

    userLogin: async (req, res) => {
        const user = await userModel.findOne({ email: req.body.email });

        const password = await userModel.findOne({ password: req.body.password })

        console.log(user)

        if (!user) {
            return res.json({ error: 'Email o contraseña incorrecto' });
        }

        const eq = bcrypt.compare(password, user.password);

        if (!eq) {
            return res.json({ error: 'Email o contraseña incorrecto' });
        }

        res.json({ success: 'Sesión iniciada', token: createToken })
    }

}

function createToken(user) {
    const payload = {
        user_id: user._id,
        user_role: user.role
    }
    return jwt.sign(payload, process.env.JWT_KEY);
}

module.exports = loginControllers;