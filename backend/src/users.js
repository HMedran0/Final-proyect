const router = require('express').Router();
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//POST /user/register/
router.post('/register', async (req, res) => {
    try {
        req.body.password = bcrypt.hashSync(req.body.password, 10);

        const user = await User.create(req.body);
        res.json(user);

    } catch (error) {
        res.json({ error: error.message });
    }

});

//POST /user/login/
router.post('/login', async (req, res)=>{
    const user = await User.findOne({ email: req.body.email });

    const password = await User.findOne({ password: req.body.password })

    console.log(user)

    if(!user){
        return res.json({ error: 'Email o contraseña incorrecto' });
    }

    const eq = bcrypt.compare(password, user.password);

    if(!eq){
        return res.json({ success: 'Sesión iniciada', token: createToken(user) });
    }
});

function createToken(user){
    const payload = {
        user_id: user._id,
        user_role: user.role
    }
    return jwt.sign(payload, process.env.JWT_KEY);
}

module.exports = router;