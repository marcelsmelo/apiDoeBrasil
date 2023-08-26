const Sequelize = require("sequelize");

module.exports = new Sequelize("doebrasil", "admin", "admin", {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
  logging: false,
  pool: {
    max: 10,
    min: 0,
    idle: 10000,
  },
});

//ALTER TABLE parceiros ADD COLUMN email varchar(255) NOT NULL;
