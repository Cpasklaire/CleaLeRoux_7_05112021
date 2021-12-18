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
    allowNull: false,
    references: {
      model: 'Posts',
      key: 'id',
      as: 'Post' 
    }
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
      as: 'User' 
    }
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