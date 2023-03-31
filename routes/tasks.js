const { Router } = require('express');
const router = Router();

const { validateJWT } = require('../middlewares/validate-jwt');
const { validateFields } = require('../middlewares/validate-fields');
const { limitRateRequest } = require('../middlewares/limit-request');

const { idExistsByTask } = require('../helpers/db-validator');

const { check } = require('express-validator');

const { 
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask 
} = require('../controllers/tasks');

router.get('/', getTasks);

router.get('/:id', [
    limitRateRequest,
    check('id', 'This is not a valid ID').isMongoId(),
    check('id').custom(idExistsByTask),
    validateFields
], getTaskById);

router.post('/', [
    validateJWT,
    limitRateRequest,
    check('title', 'title is required').not().isEmpty(),
    check('status', 'Invalid status').isIn(['pending', 'in progress', 'completed']),
    validateFields
], createTask);

router.put('/:id', [
    validateJWT,
    check('id', 'This is not a valid ID').isMongoId(),
    check('id').custom(idExistsByTask),
    validateFields
], updateTask);

router.delete('/:id', [
    validateJWT,
    limitRateRequest,
    check('id', 'This is not a valid ID').isMongoId(),
    check('id').custom(idExistsByTask),
    validateFields
], deleteTask);

module.exports = router;