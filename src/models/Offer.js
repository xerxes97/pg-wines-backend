const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('offer', {    
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    slug: {
      type: DataTypes.STRING,
      defaultValue: ""
    }
  });
};
