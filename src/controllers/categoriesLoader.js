const { Category } = require('../db');
const categoriesDb = require('../data/categories.json')

const bulkCreateCategories = async() => {
    try {
        await Category.bulkCreate(categoriesDb);
    } catch(error){
        console.log(error);
    }
}

module.exports = {
    bulkCreateCategories
}
