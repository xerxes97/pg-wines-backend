import db from '../db'
import productsDb from '../data/products.json';

const {Product} = db;

export const bulkCreateProducts = async () => {
    try {
        await Product.bulkCreate(productsDb);
    } catch(err){
        console.log('ERROR in bulkCreateProducts', err);
    }
}