const express = require('express');
const cors = require('cors');
const { dbConnection , deleteCloseDB} = require('../database/config');
const logger = require('../helpers/winston');
const dotenv = require('dotenv');
const envFile = process.env.NODE_ENV ? `env/.${process.env.NODE_ENV}.env` : '.env';
dotenv.config({ path: envFile });
class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = process.env.SERVER_ID;
        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();

    }

    dbConnection() {
        dbConnection();
    }

    deleteCloseDB() {
        deleteCloseDB();
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());

        // Directorio Público 
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use('/api/auth', require('../routes/auth'));
        this.app.use('/api/users', require('../routes/users'));
        this.app.use('/api/orders', require('../routes/orders'));
        this.app.use('/api/reports', require('../routes/report'));
        this.app.use("/info", require('../routes/info'));
    }

    listen() {
        this.app.listen(this.port, () => {
            logger.info(`Servidor corriendo en el puerto ${this.port}`);
        });
    }
}

module.exports = Server;