const { Product, Category } = require('../db');
const { Op } = require("sequelize");

async function getProducts(req, res) {
    const { name } = req.query;
    try {
        if (name) {
            let products = await Product.findAll({
                where: {
                    name: { [Op.iLike]: `%${name}%` }
                },
                include: ["category"],
            })

            products = products.map(elem => {
                return {
                    id: elem.id,
                    name: elem.name,
                    // stock: elem.stock,
                    cost: elem.cost,
                    // description: elem.description,
                    discount: elem.discount,
                    // capacity: elem.capacity,
                    image: elem.image,
                    // sales: elem.sales,
                    category: elem.category.name
                }
            });
                        
            if (products.length) return res.send(products);
            return res.status(404).send('Product not found');

        } else {
            let products = await Product.findAll({
                include: ["category"],
            })
            products = products.map(elem => {
                return {
                    id: elem.id,
                    name: elem.name,
                    // stock: elem.stock,
                    cost: elem.cost,
                    // description: elem.description,
                    discount: elem.discount,
                    // capacity: elem.capacity,
                    image: elem.image,
                    // sales: elem.sales,
                    category: elem.category.name
                }
            });
            return res.send(products);
        }
    } catch (err) {
        console.log('ERROR in getProducts', err);
    }
}




module.exports = {
    getProducts
}