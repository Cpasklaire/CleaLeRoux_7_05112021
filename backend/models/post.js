module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define("post", {
  id: { 
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
    allowNull: false
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  createdAt: { 
    type: Sequelize.DATE,
    allowNull: false,
  },
/*Champs optionnel*/
  imageURL: { 
    type: Sequelize.STRING,
    allowNull: true,
  }, 
  message: { 
    type: Sequelize.STRING,
    allowNull: true,
  }, 
  moderatedDate: { 
    type: Sequelize.DATE,
    allowNull: true,
  },
  deleteDate: { 
    type: Sequelize.DATE,
    allowNull: true,
  },
  moderatedBy: { 
    type: Sequelize.INTEGER,
    allowNull: true,
  }, 
  parentId: { 
    type: Sequelize.INTEGER,
    allowNull: true,
  }, 
  updatedAt: { 
    type: Sequelize.DATE,
    allowNull: true,
  }
});

return Post;
};
