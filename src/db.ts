require('dotenv').config();
import fs from 'fs';
import path from 'path';
const config = require(__dirname + '/config/config.ts').dev;
const Sequelize = require('sequelize');
const db: any = {};

  // const connectionString: Options = {
  //   logging: true,
  //   native: true,
  //   dialect: "postgres",
  //   database: DB_NAME,
  //   username: DB_USER,
  //   password: DB_PASSWORD,
  //   host: DB_HOST
  // }

const sequelize = new Sequelize(config);
const basename = path.basename(__filename);

// const modelDefiners: any = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefine
// TODO: change extension from js to ts
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file: string) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.ts'))
  .forEach((file: any) => {
    const model = require(path.join(__dirname, '/models', file))(sequelize, Sequelize.DataTypes);;
    console.log(__dirname, model.name, basename)
    db[model.name] = model;
  });
// Injectamos la conexion (sequelize) a todos los modelos
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
const z = sequelize.models;
console.log("**********",z)
// Capitalizamos los nombres de los modelos ie: product => Product
// let entries = Object.entries(sequelize.models);
// let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
// sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
// const { Product, Category, Brand, Packing, Offer, Review, User } = sequelize.models;

// Aca vendrian las relaciones

// Category.hasMany(Product);
// Product.belongsTo(Category);

// Brand.hasMany(Product);
// Product.belongsTo(Brand, {
//   foreignKey: "brandId"
// });

// Packing.hasMany(Product);
// Product.belongsTo(Packing, {
//   foreignKey: "packingId",
//   as: "packing",
// });

// Product.hasOne(Offer);
// Offer.belongsTo(Product);

// Product.hasMany(Review);
// Review.belongsTo(Product);

// User.hasMany(Review);
// Review.belongsTo(User);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
