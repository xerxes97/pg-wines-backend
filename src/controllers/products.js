const { Product, Category } = require('../db');

async function getProducts(req, res) {
    try {
        const products = await Product.findAll({
            // include: {
            //     model: Category,
            //     attributes: ['name'],
            //     through: { attributes: [] }
            // }
        })
        return res.send(products);
    } catch (err) {
        console.log('ERROR en getProducts', err);
    }
}



module.exports = {
    getProducts
}