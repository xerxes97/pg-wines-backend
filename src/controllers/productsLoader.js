const { Product } = require('../db');
const productsDb = require('../data/products.json')

const bulkCreateProducts = async() => {
    try {
        await Product.bulkCreate(productsDb);
    } catch(error){
        console.log(error);
    }
}

module.exports = {
    bulkCreateProducts
}
