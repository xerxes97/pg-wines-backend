import db from '../db'
import categoriesDb from '../data/categories.json';

const { Category } = db;

const bulkCreateCategories = async () => {
    try {        
        await Category.bulkCreate(categoriesDb);
    } catch(err){
        console.log('ERROR in bulkCreateCategories', err);
    }
}