module.exports = (sequelize, Sequelize) => {
  const Like = sequelize.define("like", {
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  like: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  likeDate: { 
    type: Sequelize.DATE,
    allowNull: false,
  },
  postId: {
      type: Sequelize.INTEGER,
      allowNull: false
  }});

return Like;
};