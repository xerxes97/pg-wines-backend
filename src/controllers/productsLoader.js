const { Product } = require('../db');
const productsDb = require('../data/products.json')

const bulkCreateProducts = async() => {
    try {
        await Product.bulkCreate(productsDb);
    } catch(err){
        console.log('ERROR in bulkCreateProducts', err);
    }
}

module.exports = {
    bulkCreateProducts
}
