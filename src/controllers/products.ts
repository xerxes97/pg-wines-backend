require('dotenv').config();
import { Op } from 'sequelize';
import db from '../db'
import cloudinary from 'cloudinary';
import fs from 'fs-extra';
//TODO: create an interface with the cloudinary config default
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const { Product, Category, Brand } = db;

const exclude= ['createdAt', 'updatedAt','categoryId','brandId']

export const getProducts = async (req: any, res: any) => {
    let { name, categoryId,page,orderBy,orderType,initPrice,finalPrice, brand,itemsPerPage} = req.query;
    const validate = ['null', undefined, 'undefined', '']
    if(validate.includes(name))name="";
    if(validate.includes(itemsPerPage))itemsPerPage=10;
    if(validate.includes(brand))brand="";
    if(validate.includes(categoryId))categoryId='';
    if(validate.includes(orderBy))orderBy='name';
    if(validate.includes(orderType))orderType='asc'
    if(validate.includes(page))page=1;
    if(validate.includes(initPrice))initPrice=0;
    if(validate.includes(finalPrice))finalPrice=10000000;
    try {
        const count = await Product.findAll({
            where:{
                name:{[Op.like]:`%${name}%`},
                cost: {[Op.between]:[initPrice,finalPrice]}
            },
            include:[
                {
                    model: Category,
                    where: categoryId ? {
                        id: categoryId
                    } : null
                },
                {
                    model: Brand,
                    where: brand ? {
                        name: brand
                    } : null
                }
            ]
        })
        const products = await Product.findAll({
            where: {
                name: { [Op.iLike]: `%${name}%` },
                cost: {[Op.between]:[initPrice,finalPrice]}
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
                },
                {
                    model: Brand,
                    where: brand ? {
                        name: brand
                    } : null
                }
            ],
            order:[[orderBy,orderType]]
        })
        return res.status(200).send({totalPage:Math.ceil(count.length/itemsPerPage),products})
    } catch (err) {
        console.log('ERROR in getProducts', err);
    }
}



export const getProductById = async (req: any, res: any) => {
    const { id } = req.params;
    try {
        if (!id) return res.status(422).send({ error: 'The product id is required' });
        let productById = await Product.findByPk(id,
            {
                include: ["category", "brand", "packing"],
            })
        productById = {
            id: productById.id,
            name: productById.name,
            stock: productById.stock,
            cost: productById.cost,
            description: productById.description,
            discount: productById.discount,
            capacity: productById.capacity,
            image: productById.image,
            sales: productById.sales,
            category: productById.category,
            brand: productById.brand,
            packing: productById.packing
        }
        return res.send(productById)
    } catch (err) {
        console.log('ERROR in getProductById', err);
        res.status(404).send({ error: 'The product id is wrong' });
    }
}

export const postProduct = async (req: any, res: any) => {
    //required fields: name, cost, capacity, categoryId, brandId, packingId
    //non required fields:  stock=0, description="", discount=0, image=[], sales=0, 
    const { 
        name, cost, capacity, categoryId, brandId, packingId,
        stock, description, discount, sales 
    } = req.body;
    const image = req.file? req.file.filename : undefined;
    try {
        if (name && cost && capacity && categoryId && brandId && packingId) {
            const result = req.file ? await cloudinary.v2.uploader.upload(req.file.path) : undefined;
            var createdProduct = await Product.create({
                name,
                stock,
                cost,
                description,
                discount,
                capacity,
                image: result ? result.secure_url.split('') : [],
                sales
            });
            await createdProduct.setCategory(categoryId);
            await createdProduct.setBrand(brandId);
            await createdProduct.setPacking(packingId);
            await fs.unlink(req.file.path);
            res.send(createdProduct);
        } else {
            res.status(422).send({ error: 'These data are required: name, cost, capacity, categoryId, brandId, packingId' })
        }
    } catch (err) {
        console.log('ERROR in postProduct', err);
    }
}

export const updateProduct = async (req: any, res: any) => {
    //required fields: name, cost, capacity, categoryId, brandId, packingId
    //non required fields:  stock=0, description="", discount=0, image=[], sales=0, 
    const { 
        id, name, cost, capacity, categoryId, brandId, packingId,
        stock, description, discount, image, sales
    } = req.body;
    if (!id) return res.status(422).send({ error: 'The product id is required' });
    if (!name && !stock && !cost && !description && !discount && !capacity && !image && !sales && !categoryId && !brandId && !packingId) {
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
        if (brandId) { product.brandId = brandId }
        if (packingId) { product.packingId = packingId }
        await product.save();
        return res.send('The product has been updated suscesfully');
    } catch (err) {
        console.log('ERROR in updateProduct', err);
    }
}
export const deleteProduct = async (req: any, res: any) => {
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