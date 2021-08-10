const dotenv = require('dotenv');
const envFile = process.env.NODE_ENV ? `env/.${process.env.NODE_ENV}.env` : '.env';
console.log(process.env.NODE_ENV );
console.log(envFile);
dotenv.config({ path: envFile });

const Server = require('./models/server');

const server = new Server();

server.listen();