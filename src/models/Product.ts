import {
    Model, UUIDV4
  } from 'sequelize';

  module.exports = (sequelize: any, DataTypes: any) => {
    class Product extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      // static associate(models: any) {
      //   // define association here
      // //   User.belongsToMany(models.Project, {
      // //     through: 'ProjectAssignments'
      // //   })
      // }
    };
    Product.init({
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
      cost: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: ""
      },
      discount: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
      capacity: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      image: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
        defaultValue: []
      },
      sales: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      }
    }, {
      sequelize,
      modelName: 'Product',
    });
    return Product;
  };