import db from '../db'

import { bulkCreateCategories } from './categoriesLoader';
import { bulkCreateProducts } from './productsLoader';
import { bulkCreateBrands } from './brandsLoader';
import { bulkCreatePacking } from './packingLoader';

export const resetDb = (_: any, res: any) => {
    db.sequelize.sync({ alter: true })
        .then(async () => await bulkCreateCategories())
        .then(async () => await bulkCreateBrands())
        .then(async () => await bulkCreatePacking())
        .then(async () => await bulkCreateProducts())
        .then(res.send('DB reset successfully'))
        .catch((e: any) => console.log('ERROR :( ' + e));
}