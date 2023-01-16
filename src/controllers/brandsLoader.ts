import db from '../db'
import brands from '../data/brands.json';

const { Brand } = db;

const bulkCreateBrands = async () => {
    try {
        await Brand.bulkCreate(brands);
    } catch(err){
        console.log('ERROR in bulkCreateBrands', err);
    }
}