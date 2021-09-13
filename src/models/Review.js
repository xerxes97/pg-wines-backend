const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('review', {   
    review: {
      type: DataTypes.STRING,
      allowNull: true
    },
    points: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  });
};
