const { DataTypes, UUID } = require('sequelize');

module.exports = (sequelize) => {
  //See constraints here => https://sequelize.org/master/manual/validations-and-constraints.html
  sequelize.define('user', {   
    id:{
      type: DataTypes.UUID,
      allowNull:false,
      primaryKey:true
    }, 
    displayName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
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
    photoURL: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "https://i.imgur.com/vfrW9Xx.png"
    },
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    }
  });
};
