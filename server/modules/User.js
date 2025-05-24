const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const db = require('../config/database');

const User = db.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password_hash: {
    type: DataTypes.STRING,
    allowNull: false
  },
  profile_picture: {
    type: DataTypes.STRING
  },
  bio: {
    type: DataTypes.TEXT
  },
  skills: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: []
  },
  current_projects: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: []
  },
  points: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  level: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  }
}, {
  hooks: {
    beforeCreate: async (user) => {
      if (user.password_hash) {
        const salt = await bcrypt.genSalt(10);
        user.password_hash = await bcrypt.hash(user.password_hash, salt);
      }
    }
  }
});

User.prototype.validPassword = async function(password) {
  return await bcrypt.compare(password, this.password_hash);
};

module.exports = User;