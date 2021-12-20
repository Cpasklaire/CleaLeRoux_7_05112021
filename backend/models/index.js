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
//Models
db.Post = require('./post')(sequelize, Sequelize);
db.User = require('./user')(sequelize, Sequelize);
db.Like = require('./like')(sequelize, Sequelize);
db.Commentaire = require('./commentaire')(sequelize, Sequelize);
//Liens
db.Post.belongsTo(db.User, {foreignKey: 'userId', as: 'User'});
db.Commentaire.belongsTo(db.User, {foreignKey: 'userId', as: 'User'});
db.Commentaire.belongsTo(db.Post, {foreignKey: 'postId', as: 'Post'});
db.Post.hasMany(db.Like, {foreignKey: 'postId'})
db.Like.belongsTo(db.Post, {foreignKey: 'postId', as: 'Post'})
db.Like.belongsTo(db.User, {foreignKey: 'userId', as: 'User'})

module.exports = db;




