const sequelize = require('../../config/database');
const { DataTypes } = require('sequelize');

const UserSqModel = sequelize.define('User', {
  balance: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  version: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
},{
  version: true,
});

module.exports = UserSqModel;