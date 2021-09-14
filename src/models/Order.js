const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('order', {    
      // status: {
      //   type: DataTypes.ENUM('approved', 'rejected', 'cart'),
      //   defaultValue: 'cart',
      //   allowNull: false,
      // },
      // shippingStatus: {
      //   type: DataTypes.ENUM('uninitiated', 'processing', 'approved', 'cancelled'),
      //   defaultValue: 'uninitiated',
      //   allowNull: false,
      // },
    });
  };