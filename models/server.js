const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    constructor () {
        this.app = express();
        this.port = process.env.PORT;

        this.users = '/api/users';
        this.tasksPath = '/api/tasks';
        this.authPath = '/api/auth';

        // Database connection
        this.dbConnect();

        // Middlewares
        this.middlewares();

        // Routes
        this.routes();
    }

    async dbConnect () {
        await dbConnection();
    }

    middlewares () {
        // CORS
        this.app.use(cors());

        // Parse body
        this.app.use(express.json());

        // Public path
        this.app.use(express.static('public'));
    }

    routes () {
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.tasksPath, require('../routes/tasks'));
        this.app.use(this.users, require('../routes/users'));
    }

    listen () {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto: ', this.port);
        })
    }

}

module.exports = Server;
