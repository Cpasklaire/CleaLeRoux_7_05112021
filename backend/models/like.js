const { Sequelize, Model } = require('sequelize');

/* Model like */
class Like extends Model {}
Like.init({
  userId: {
    type: Sequelize.INTEGER,
    unique: true,
    allowNull: false,
  },
  like: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false
  },
  likeDate: { 
    type: Sequelize.DATE,
    allowNull: true,
  },
  postId: {
      type: Sequelize.INTEGER,
      unique: true,
      allowNull: false
  }
}, {
    modelName: 'likes',
    sequelize
})

Like.sync()
module.exports = Like;