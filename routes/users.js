const { Router } = require('express');
const router = Router();

const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { emailExists } = require('../helpers/db-validator');

const { getUsers, createUser } = require('../controllers/users');

router.get('/', getUsers);

router.post('/', [
    check('name', 'name is required').not().isEmpty(),
    check('password', 'Password minimum length 6').isLength({ min: 6 }),
    check('email', 'This is not a valid email').isEmail(),
    check('email').custom( emailExists ),
    validateFields
], createUser);

module.exports = router;
