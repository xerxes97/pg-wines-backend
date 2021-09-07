const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  //See constraints here => https://sequelize.org/master/manual/validations-and-constraints.html
  sequelize.define('user', {    
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    hashedPassword: {
      type: DataTypes.STRING(64),
      is: /^[0-9a-f]{64}$/i,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      isEmail: true
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ""
    },
    birthDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    lastloginDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    registrationMode: {
      type: DataTypes.INTEGER,
      allowNull: false,
      isIn: [['direct', 'facebook', 'google']]
    },
    verification: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  });
};
