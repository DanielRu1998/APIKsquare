const { Schema, model } = require('mongoose');

const TaskSchema = Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    description: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        required: false
    },
    status: {
        type: String,
        require: true,
        enum: ['pending', 'in progress', 'completed']
    }
});

TaskSchema.methods.toJSON = function() {
    const { __v, _id, ...task } = this.toObject();
    task.uid = _id;
    return task;
};

module.exports = model( 'Task',  TaskSchema);
