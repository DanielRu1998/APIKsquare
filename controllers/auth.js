const { response } = require("express");
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const { createJWT } = require("../helpers/create-jwt");

const login = async(req, res = response) => {
    const { email, password } = req.body;

    try {
        // If user in DB:
        const user = await User.findOne({email});
        if ( !user ) {
            return res.status(400).json({
                msg: 'User / Password does not exists'
            });
        }

        // Valid Password
        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'User / Password does not exists'
            });
        }

        // Create JWT
        const token = await createJWT(user.id);

        res.json({
            nameUser: user.name,
            emailUser: user.email,
            token
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Interval server error'
        });
    }
};

module.exports = {
    login
}
