const mongoose = require('mongoose');
const logger = require('../helpers/winston');
const dbConnection = () => {
    try {
        mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        logger.info('Base de datos ONLINE');
    } catch (error) {
        throw new Error('Error a la hora de iniciar la base de datos');

    }
}

const deleteCloseDB = () => {
    mongoose.connection.db.dropDatabase(() => {
        mongoose.connection.close()
    });
}

module.exports = {
    dbConnection,
    deleteCloseDB
}