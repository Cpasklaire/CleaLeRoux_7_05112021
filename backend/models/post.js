module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define('Posts', {
    //ID
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    userId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
        as: 'User' 
      }
    },
    //Contenu
    text: {
      allowNull: true,
      type: Sequelize.STRING
    },
    imageURL: {
      type: Sequelize.STRING
    },
    //Like
    likes: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
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
  return Post;
};
