//connexion à la base de données

module.exports = {
    DB: 'groupomania',
    USER: process.env.DB_CONFIG_USERNAME,
    PASSWORD: process.env.DB_CONFIG_PASSWORD,
    HOST: 'localhost',
    dialect: 'mysql',
    pool: {
      max: 50,  //nb max de connexion
      min: 0,  //nb min de connexion
      acquire: 30000,  //durée maximale, en millisecondes, pendant laquelle ce pool essaiera d'obtenir la connexion avant de lancer une erreur
      idle: 10000  //temps maximum, en millisecondes, pendant lequel une connexion peut être inactive avant d'être libérée
    }
  };