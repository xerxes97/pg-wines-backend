import {
    Model, UUIDV4
  } from 'sequelize';

  module.exports = (sequelize: any, DataTypes: any) => {
    class Review extends Model {
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
    Review.init({
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      review: {
        type: DataTypes.STRING,
        allowNull: true
      },
      points: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
    }, {
      sequelize,
      modelName: 'Review',
    });
    return Review;
  };