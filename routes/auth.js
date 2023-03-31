const { Router } = require('express');
const router = Router();

const { login } = require('../controllers/auth');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');

router.post('/login',[
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields
], login);

module.exports = router;
