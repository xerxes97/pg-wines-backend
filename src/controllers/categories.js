const { Category } = require('../db');

async function getCategories(req, res) {
    try {
        const categories = await Category.findAll()
        return res.send(categories);
    } catch (err) {
        console.log('ERROR in getCategories', err);
    }
}

async function postCategory(req, res) {
    const { name } = req.body;
    try {
        if (name) {
            const createdCategory = await Category.findOrCreate({
                where: { name: name }
            });
            res.send(createdCategory);
        } else {
            res.status(422).send({ error: 'Name is required' })
        }
    } catch (err) {
        console.log('ERROR in postCategory', err);
    }
}


module.exports = {
    getCategories,
    postCategory
}