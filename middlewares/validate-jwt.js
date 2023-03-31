const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = (req = request, res = response, next) => {
    const token = req.header('k-token');
    if(!token) {
        return res.status(401).json({
            msg: 'There is not a header token'
        });
    }

    try {
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );
        req.uid = uid;
        next();
    } catch (error) {
        return res.status(401).json({
            msg: 'Invalid Token!'
        });
    }
};

module.exports = {
    validateJWT
};
