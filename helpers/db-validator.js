const User = require('../models/user');
const Task = require('../models/task');

const emailExists = async(email = '') => {
    const existEmail = await User.findOne({ email });
    if (existEmail) {
        throw new Error('This email has already created');
    }
};

const idExistsByTask = async(id) => {
    const exisTaskById = await Task.findById(id);
    if (!exisTaskById) {
        throw new Error('This Task does not exist');
    }
};

module.exports = {
    emailExists,
    idExistsByTask
}