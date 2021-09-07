const server = require('./src/app');
const { conn } = require('./src/db');

const { bulkCreateCategories } = require('./src/controllers/categoriesLoader');
const { bulkCreateProducts } = require('./src/controllers/productsLoader');

conn.sync({ force: true })
    .then(async () => await bulkCreateCategories())
    .then(async () => await bulkCreateProducts())
    .then(() => {
        server.listen(3001, () => {
            console.log('Server listening at 3001');
        });
    })
    .catch(e => console.log('ERROR :( ' + e));


