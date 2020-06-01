const Sequelize = require('sequelize');
const config = require('../config/database')

module.exports =  new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    port: config.port,
    dialect: 'mysql',
    logging: false,
    pool:{
        max: 10,
        min: 0,
        idle: 10000
    }
})

//ALTER TABLE parceiros ADD COLUMN email varchar(255) NOT NULL;
