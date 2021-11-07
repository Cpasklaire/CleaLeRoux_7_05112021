/*communication avec le serveur*/
const express = require('express');
const app = express(); /*application Express*/
require('dotenv').config(); //application .env
const Sequelize = require('sequelize');

/*Connection à la databaser*/
const sequelize = new Sequelize(process.env.CONNECT_DB, {
    host: 'localhost',
    dialect: 'mysql'
});
const dbConnection = async () => {
    try {
        await sequelize.authenticate()
        console.log('Connection à la database réussie')
    } catch (err) {
        throw new Error('Connection à la database échouée')
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

/*parle en json*/
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const path = require('path');
app.use('/images', express.static(path.join(__dirname, 'images')));

const postRoutes = require('./routes/post');
app.use('/api/post', postRoutes);

const userRoutes = require('./routes/user');
app.use('/api/post', postRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;