const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = process.env.SERVER_ID;

        //Conectando a la base de datos
        this.dbConnection();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
        
    }

    async dbConnection(){
        await dbConnection();
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
        this.app.use('/api/auth',require('../routes/auth'));
        this.app.use('/api/users',require('../routes/users'));
        this.app.use('/api/orders',require('../routes/orders'));
        this.app.use("/info", require('../routes/info'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port);
        });
    }
}

module.exports = Server;