import db from '../db'

const { bulkCreateCategories } = require('./categoriesLoader');
const { bulkCreateProducts } = require('./productsLoader');
const { bulkCreateBrands } = require('./brandsLoader');
const { bulkCreatePacking } = require('./packingLoader');

function resetDb(_: any, res: any) {
    db.sync({ alter: true })
        .then(async () => await bulkCreateCategories())
        .then(async () => await bulkCreateBrands())
        .then(async () => await bulkCreatePacking())
        .then(async () => await bulkCreateProducts())
        .then(res.send('DB reset successfully'))
        .catch(e => console.log('ERROR :( ' + e));
}

module.exports = { resetDb };