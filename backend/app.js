/*communication avec le serveur*/
const express = require('express');
const app = express(); /*application Express*/
require('dotenv').config(); //application .env
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize("groupomania", "root", "Javaaimel0", {
  dialect: "mysql",
  host: "localhost"
});
try {
  sequelize.authenticate();
  console.log('Connecté à la base de données MySQL!');
} catch (error) {
  console.error('Impossible de se connecter, erreur suivante :', error);
}

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

const publicationsRoutes = require('./routes/publications');
app.use('/api/publications', publicationsRoutes);

const userRoutes = require('./routes/user');
app.use('/api/publications', publicationsRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;