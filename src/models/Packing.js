const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('packing', {    
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },{
      timestamps: false
  });
};