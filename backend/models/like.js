module.exports = (sequelize, Sequelize) => {
  const Like = sequelize.define('Likes', {
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
      key: 'id'
    }
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
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
  return Like;
};