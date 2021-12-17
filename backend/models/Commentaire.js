module.exports = (sequelize, Sequelize) => {
  const Commentaire = sequelize.define('Commentaires', {
  //ID
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  postId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  //Texte
  text: {
    type: Sequelize.STRING,
    allowNull: false
  },
  //Date
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  }
  });
    return Commentaire;
};