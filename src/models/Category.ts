import {
    Model, UUIDV4
  } from 'sequelize';

  module.exports = (sequelize: any, DataTypes: any) => {
    class Category extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      id!: string;
      name!: string;
      // static associate(models: any) {
      //   // define association here
      // //   User.belongsToMany(models.Project, {
      // //     through: 'ProjectAssignments'
      // //   })
      // }
    };
    Category.init({
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
    }, {
      sequelize,
      modelName: 'Category',
    });
    return Category;
  };