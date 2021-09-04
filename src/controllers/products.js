const { Product, Category } = require('../db');
const { Op } = require("sequelize");

async function getProducts(req, res) {
    const { name, category } = req.query;
    try {
        let products = await Product.findAll({
            include: ["category"],
        })
        products = products.map(elem => {
            return {
                id: elem.id,
                name: elem.name,
                cost: elem.cost,
                discount: elem.discount,
                image: 'https://digitalyactual.com/delsur/'+elem.image[0]+'.jpg',
                category: elem.category.name
            }
        });
        if (name) {
            const byName = products.filter(elem => elem.name.toLowerCase().includes(name.toLocaleLowerCase()));
            byName.length ? 
            res.status(200).send(byName) :
            res.status(404).send([{error: 'No results found'}]); 
        } 
        if (category) {
            const byCategory = products.filter(elem => elem.category.toLowerCase().includes(category.toLocaleLowerCase()));
            byCategory.length ? 
                res.status(200).send(byCategory) :
                res.status(404).send([{error: 'No results found'}]); 
        } else {
            res.status(200).send(products);
        }
    } catch (err) {
        console.log('ERROR in getProducts', err);
    }
}


async function getProductById(req, res) {
    const { id } = req.params;
    try {
        if (id) {
            let productById = await Product.findByPk(id,
                {
                    include: ["category"],
                })

            productById = {
                id: productById.id,
                name: productById.name,
                cost: productById.cost,
                discount: productById.discount,
                image: 'https://digitalyactual.com/delsur/'+productById.image[0]+'.jpg',
                category: productById.category.name
            }
            return res.send(productById)
        }


    } catch (err) {
        console.log('ERROR in getProductById', err);
    }
}

// async function postProduct(req, res) {
//     const {name, stock, cost, description, discount, capacity, image, sales} = req.body;
//     try {
//         if(name && cost && capacity && image) {
//             const createdProduct = await Product.create({
//                 name,
//                 stock,
//                 cost,
//                 description,
//                 discount,
//                 capacity,
//                 image,
//                 sales
//             });
//         } else {
//             res.status(422).send([{error: 'Unprocessable Entity'}])
//         }   
//     } catch (error) {
//         console.log('ERROR in getProductById', err);
//     }
// }




module.exports = {
    getProducts,
    getProductById,
}