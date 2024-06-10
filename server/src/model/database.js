require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
    host: process.env.DATABASE_HOST,
    dialect: 'mysql',
    timezone: '+02:00', // Aquí puedes especificar tu zona horaria

    logging: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    waitForConnections: process.env.DATABASE_WAITFORCONNECTIONS === 'true',
    connectionLimit: parseInt(process.env.DATABASE_CONNECTIONLIMIT),
    queueLimit: parseInt(process.env.DATABASE_QUEUELIMIT)
});

module.exports = sequelize;