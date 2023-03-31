const { response, request } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

const getUsers = async (req = request, res = response) => {
    const { limit = 5, inf = 0 } = req.query;
    const users = await User.find()
        .skip(+inf)
        .limit(+limit);

    res.json(users)
};

const createUser = async (req, res = response) => {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });

    // Encrypt password
    const salt  = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);
    await user.save();

    res.json({
        msg: 'User created successfully!',
        user
    });
};

module.exports = {
    getUsers,
    createUser
};
