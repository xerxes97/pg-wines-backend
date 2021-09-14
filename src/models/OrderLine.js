const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('order_Line', {    
    quantity: {        
      type: DataTypes.INTEGER,
      allowNull: false      
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false      
    },
  });
};