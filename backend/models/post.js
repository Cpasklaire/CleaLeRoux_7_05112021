module.exports = (sequelizee, Sequelize) => {
  const Post = sequelizee.define("post", {
    updatedAt: false,
    createdAt: false,

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
  createDate: { 
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
  updateDate: { 
    type: Sequelize.DATE,
    allowNull: true,
  }
});

return Post;
};