const { Product} = require('../db');

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
            res.status(404).send({error: 'No results found'}); 
        } 
        if (category) {
            const byCategory = products.filter(elem => elem.category.toLowerCase().includes(category.toLocaleLowerCase()));
            byCategory.length ? 
                res.status(200).send(byCategory) :
                res.status(404).send({error: 'No results found'}); 
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
                stock: productById.stock,
                cost: productById.cost,
                description: productById.description,
                discount: productById.discount,
                capacity: productById.capacity,
                image: 'https://digitalyactual.com/delsur/'+productById.image[0]+'.jpg',
                sales: productById.sales,
                category: productById.category.name
            }
            return res.send(productById)
        }


    } catch (err) {
        console.log('ERROR in getProductById', err);
    }
}

async function postProduct(req, res) {
    const {name, stock, cost, description, discount, capacity, image, sales, categoryId} = req.body;
    try {
        if(name && cost && capacity && image) {
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
            res.status(422).send([{error: 'Unprocessable Entity'}])
        }   
    } catch (err) {
        console.log('ERROR in postProduct', err);
    }
}

async function updateProduct(req, res, next) {  
    const { name, stock, cost, description, discount, capacity, image, sales, id, category } = req.body;
    if (!id) return next({ message: 'El id del producto es requerido'})
    try {
        const product = await Product.findByPk(id)
        if (!product) return next({ message: 'El id del producto es incorrecto'})
        if (name) { product.name = name }
        if (description) { product.description = description }
        if (stock) { product.stock = stock}
        if (cost) { product.cost = cost }
        if (discount) { product.discount = discount }
        if (capacity) { product.capacity = capacity }
        if (image) { product.price = image }
        if (sales) { product.sales = sales }
        if (category) { product.categoryId=category}
        await product.save()
        // console.log (product);
        return res.send('El producto ha sido actualizado');
    } catch (error) {
        next({message: 'Algo salio mal con la modificacion del producto'})
    }
}
async function deleteProduct(req, res, next) {
    const { id } = req.body;
    if (!id) return res.send('El id del producto es requerido')  
    const prod= await Product.findByPk(id)
    if(!prod)return res.send('El producto no existe')
    try {
        await Product.destroy({
            where: {
                id
            }
        })
        return res.send('El producto fue borrado con éxito')
    } catch (error) {
        res.send('Hubo un error en la eliminación del producto');
    }
}





module.exports = {
    getProducts,
    getProductById,
    postProduct,
    updateProduct,
    deleteProduct
}