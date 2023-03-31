const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database online!');
    } catch (error) {
        throw new Error('Database connection error');
    }
};

module.exports = {
    dbConnection
};
