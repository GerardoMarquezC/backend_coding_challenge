const Server = require('./models/server');

const server = new Server();
server.dbConnection();
server.listen();