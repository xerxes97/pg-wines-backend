const server = require('./src/app');
const { conn } = require('./src/db');

const { bulkCreateCategories } = require('./src/controllers/categoriesLoader');
const { bulkCreateProducts } = require('./src/controllers/productsLoader');
const { bulkCreateBrands } = require('./src/controllers/brandsLoader');

const PORT = process.env.PORT || 3001;

conn.sync({ force: true })
    .then(async () => await bulkCreateCategories())
    .then(async () => await bulkCreateBrands())
    .then(async () => await bulkCreateProducts())
    .then(() => {
        server.listen(PORT, () => {
            console.log(`Server listening at ${PORT}`);
        });
    })
    .catch(e => console.log('ERROR :( ' + e));


