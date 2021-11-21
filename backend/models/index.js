const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");
const db = {};


const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});


db.Sequelize = Sequelize;
db.post = require('./post')(sequelize, Sequelize);
db.user = require('./user')(sequelize, Sequelize);
db.like = require('./like')(sequelize, Sequelize);

module.exports = db;