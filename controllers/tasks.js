const { response, request } = require('express');
const Task = require('../models/task');

const getTasks = async (req = request, res = response) => {
    const { limit = 5, inf = 0, status, date, sort } = req.query;
    let outcome = [];
    const filters = {};
    if (status) filters['status'] = status;
    if (date) { // IF a user search by date
        const regex = /^[0-9]{2}-[0-9]{2}-[0-9]{4}$/;
        if (!regex.test(date)) {
            return res.status(400).json({
                msg: 'Provide a Date in format: mm-dd-yyyy',
            })
        }
        let timestamp = Date.parse(date);
        if (isNaN(timestamp)) {
            return res.status(400).json({
                msg: 'Date invalid!',
            })
        }
        filters['date'] = new Date(date)
    };
    
    if (sort) { // IF a user sorts data by title or date
        switch (sort) {
            case 'title':
                outcome = await Task.find().sort({ title: 1 }).collation({ locale: "en", caseLevel: true })
                    .skip(+inf)
                    .limit(+limit);
                break;
            case 'date':
                outcome = await Task.find().sort({date: -1})
                    .skip(+inf)
                    .limit(+limit);
                break;
        }
    } else {
        const tasks = await Task.find(Object.values(filters).length !== 0 ? filters : null)
        .skip(+inf)
        .limit(+limit);
        outcome = tasks;
    }
    res.json(outcome);
};

const getTaskById = async (req, res = response) => {
    const { id } = req.params;

    const task = await Task.findById(id);

    res.json(task)
};

const createTask = async (req, res = response) => {
    const { title, description, date, status } = req.body;
    if (date) {
        const regex = /^[0-9]{2}-[0-9]{2}-[0-9]{4}$/;
        if (!regex.test(date)) {
            return res.status(400).json({
                msg: 'Provide a Date in format: mm-dd-yyyy',
            })
        }
        let timestamp = Date.parse(date);
        if (isNaN(timestamp)) {
            return res.status(400).json({
                msg: 'Date invalid!',
            })
        }
    }
    const task = new Task({ title, description, date, status });
    await task.save();

    res.json({
        msg: 'Task created successfully!',
        task
    })
};

const updateTask = async (req, res = response) => {
    const { id } = req.params;
    const { ...rest } = req.body;

    const task = await Task.findByIdAndUpdate(id, rest);

    res.json({
        msg: 'Task updated successfully',
        task
    })
};

const deleteTask = async (req, res = response) => {
    const { id } = req.params;
    
    const task = await Task.findByIdAndDelete(id); 

    res.json({
        msg: 'Task deleted successfully',
        task
    })
};

module.exports = {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
}

