const jwt = require('jsonwebtoken');

const createJWT = ( uid = '' ) => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '3h' // Expires on 3 hours
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('Could not create JWT token');
            } else {
                resolve(token);
            }
        });
    });
};

module.exports = {
    createJWT
};
