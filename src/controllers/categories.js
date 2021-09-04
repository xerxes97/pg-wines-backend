const { Category } = require('../db');

async function getCategories(req, res) {
    try {
        const categories = await Category.findAll({
            // attributes: ['id', 'name'],   
            // include: {
            //     model: Category,
            //     attributes: ['name'],
            //     through: { attributes: [] }
            // }
        })
        return res.send(categories);
    } catch (err) {
        console.log('ERROR in getCategories', err);
    }
}

async function postCategory(req, res) {
    const {name} = req.body;
    try {
        if(name) {
            const createdCategory = await Category.create({
                name
            });
            res.send(createdCategory);
        } else {
            res.status(422).send({error: 'Unprocessable Entity'})
        }   
    } catch (error) {
        console.log('ERROR in postCategory', err);
    }
}


module.exports = {
    getCategories,
    postCategory
} 