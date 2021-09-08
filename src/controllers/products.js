const { Op } = require('sequelize');
const { Product,Category } = require('../db');

const itemsPerPage= 10;
const exclude= ['createdAt', 'updatedAt','categoryId']

async function getProducts(req, res) {
    let { name, categoryId,page,orderBy,orderType,initialPrice,finalPrice} = req.query;
    const validate = ['null', undefined, 'undefined', '']
    if(validate.includes(name))name="";
    if(validate.includes(categoryId))categoryId='';
    if(validate.includes(orderBy))orderBy='name';
    if(validate.includes(orderType))orderType='asc'
    if(validate.includes(page))page=1;
    if(validate.includes(initialPrice)) initialPrice=0;
    if(validate.includes(finalPrice))finalPrice=10000000;
    try {
        const count = await Product.findAll({
            where:{
                name:{[Op.like]:`%${name}%`},
                cost: {[Op.between]:[initialPrice,finalPrice]}
            },
            include:[
                {
                    model: Category,
                    where: categoryId ? {
                        id: categoryId
                    } : null
                }
            ]
        })
        const products = await Product.findAll({
            where: {
                name: { [Op.iLike]: `%${name}%` },
                cost: {[Op.between]:[initialPrice,finalPrice]}
            },
            attributes: {
                exclude
            },
            offset: (page - 1) * itemsPerPage,
            limit: itemsPerPage,
            include:[
                {
                    model: Category,
                    where: categoryId ? {
                        id: categoryId
                    } : null,
                    attributes: ['name', 'id']
                }
            ],
            order:[[orderBy,orderType]]
        })
        products.map(prod=>{
            let imgUrl=`https://digitalyactual.com/delsur/${prod.image[0]}.jpg`
            prod.image[0]=imgUrl;
        })
        return res.status(200).send({totalPage:Math.ceil(count.length/itemsPerPage),products})
    } catch (err) {
        console.log('ERROR in getProducts', err);
    }
}


async function getProductById(req, res) {
    const { id } = req.params;
    try {
        if (!id) return res.status(422).send({ error: 'The product id is required' });
        let productById = await Product.findByPk(id,
            {
                include: ["category"],
            })

        productById = {
            id: productById.id,
            name: productById.name,
            stock: productById.stock,
            cost: productById.cost,
            description: productById.description,
            discount: productById.discount,
            capacity: productById.capacity,
            image: 'https://digitalyactual.com/delsur/' + productById.image[0],
            sales: productById.sales,
            category: productById.category.name
        }
        return res.send(productById)
    } catch (err) {
        console.log('ERROR in getProductById', err);
        res.status(404).send({ error: 'The product id is wrong' });
    }
}

async function postProduct(req, res) {
    const { name, stock, cost, description, discount, capacity, image, sales, categoryId } = req.body;
    try {
        if (name && cost && capacity && image) {
            const createdProduct = await Product.create({
                name,
                stock,
                cost,
                description,
                discount,
                capacity,
                image,
                sales
            });
            await createdProduct.setCategory(categoryId);
            res.send(createdProduct);
        } else {
            res.status(422).send({ error: 'These data are required: name, cost, capacity, image' })
        }
    } catch (err) {
        console.log('ERROR in postProduct', err);
    }
}

async function updateProduct(req, res) {
    const { name, stock, cost, description, discount, capacity, image, sales, id, categoryId } = req.body;
    if (!id) return res.status(422).send({ error: 'The product id is required' });
    if (!name && !stock && !cost && !description && !discount && !capacity && !image && !sales && !categoryId) {
        return res.status(422).send({ error: 'You should specified at least one valid field.' });
    }
    try {
        const product = await Product.findByPk(id);
        if (!product) return res.status(422).send({ error: 'The product id is wrong' });
        if (name) { product.name = name }
        if (description) { product.description = description }
        if (stock) { product.stock = stock }
        if (cost) { product.cost = cost }
        if (discount) { product.discount = discount }
        if (capacity) { product.capacity = capacity }
        if (image) { product.price = image }
        if (sales) { product.sales = sales }
        if (categoryId) { product.categoryId = categoryId }
        await product.save();
        return res.send('The product has been updated suscesfully');
    } catch (err) {
        console.log('ERROR in updateProduct', err);
    }
}
async function deleteProduct(req, res) {
    const { id } = req.body;
    if (!id) return res.send({ error: 'The product id is required' })
    const prod = await Product.findByPk(id)
    if (!prod) return res.send({ error: 'The product does not exist' })
    try {
        await Product.destroy({
            where: {
                id
            }
        })
        return res.send('The product was removed successfully')
    } catch (err) {
        console.log('ERROR in deleteProduct', err);
    }
}





module.exports = {
    getProducts,
    getProductById,
    postProduct,
    updateProduct,
    deleteProduct
}