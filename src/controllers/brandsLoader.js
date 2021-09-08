const { Brand } = require('../db');
const brands = require('../data/brands.json')

const bulkCreateBrands = async() => {
    try {
        await Brand.bulkCreate(brands);
    } catch(err){
        console.log('ERROR in bulkCreateBrands', err);
    }
}

module.exports = {
    bulkCreateBrands
}
