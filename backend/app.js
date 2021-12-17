/*communication avec le serveur*/
const express = require('express');
const app = express(); /*application Express*/
const dbConfig = require('../Backend/config/db.config');
const Sequelize = require('sequelize');
const db = require('./models');



/*Connection à la database*/
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

db.post = require('./models/Post')(sequelize, Sequelize);
db.user = require('./models/User')(sequelize, Sequelize);
db.like = require('./models/Like')(sequelize, Sequelize);
db.commentaire = require('./models/Commentaire')(sequelize, Sequelize);

module.exports = db;

const dbConnection = async () => {
    try {
        await sequelize.authenticate()
        console.log('Connection à la base de données réussie')
    } catch (err) {
        throw new Error('Connection à la base de données échouée')
    }
}
module.exports = { sequelize, dbConnection }

/*middleware communication des différent port(localhost) possible*/
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); //accéder à notre API depuis n'importe quelle origine
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); //ajouter les headers mentionnés aux requêtes envoyées vers notre API
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); //envoyer des requêtes avec les méthodes mentionnées
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const path = require('path');
app.use('/images', express.static(path.join(__dirname, 'images')));


const postRoutes = require('./routes/post');
app.use('/api/post', postRoutes);

const userRoutes = require('./routes/user');
app.use('/api/user', userRoutes);

const likeRoutes = require('./routes/like');
app.use('/api/post', likeRoutes);

const commentaireRoutes = require('./routes/commentaire');
app.use('/api/commentaire', commentaireRoutes);


module.exports = app;
