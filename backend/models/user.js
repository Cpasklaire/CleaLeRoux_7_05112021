module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('user', {
  id: { 
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  firstName: { 
    type: Sequelize.STRING,
    allowNull: false
  },
  email: { 
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: { 
    type: Sequelize.STRING,
    allowNull: false
  },
  role: { 
    type: Sequelize.STRING,
    defaultValue: "user",    
    allowNull: false,
  },
  createDate: { 
    type: Sequelize.DATE,
    allowNull: false,
  },
/*Champs optionnel*/
  avatar: { 
    type: Sequelize.STRING,
    allowNull: true,
  }, 
  description: { 
    type: Sequelize.STRING,
    allowNull: true,
  }, 
  updateDate: { 
    type: Sequelize.DATE,
    allowNull: true,
  },
  deleteDate: { 
    type: Sequelize.DATE,
    allowNull: true,
  },
  deleteBy: { 
    type: Sequelize.INTEGER,
    allowNull: true,
  }, 
  lastRefreshDate: { 
    type: Sequelize.DATE,
    allowNull: true,
  }
});
return User;
};
