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



module.exports = {
    getCategories
} 