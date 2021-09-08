const { Brand } = require('../db');

async function getBrands(req, res) {
    try {
        const brands = await Brand.findAll()
        return res.send(brands);
    } catch (err) {
        console.log('ERROR in getBrands', err);
    }
}

async function postBrands(req, res) {
    const { name } = req.body;
    try {
        if (name) {
            const createdBrand = await Brand.findOrCreate({
                where: { name: name }
            });
            res.send(createdBrand);
        } else {
            res.status(422).send({ error: 'The field name is required' })
        }
    } catch (err) {
        console.log('ERROR in postBrand', err);
    }
}

async function updateBrands(req, res) {
    const { id, name } = req.body;
    if (!id) return res.status(422).send({ error: 'The brand id is required' });
    if (!name) return res.status(422).send({ error: 'You should specified the new name.' });

    try {
        const brand = await Brand.findByPk(id);
        if (!brand) return res.status(422).send({ error: 'The brand id is wrong' });
        brand.name = name;
        await brand.save();
        return res.send('The brand has been updated suscesfully');
    } catch (err) {
        console.log('ERROR in updateBrands', err);
    }
}

async function deleteBrands(req, res) {
    const { id } = req.body;
    if (!id) return res.send({ error: 'The brand id is required' })
    const brand = await Brand.findByPk(id)
    if (!brand) return res.send({ error: 'There is not any brand with this id' })
    try {
        await Brand.destroy({
            where: {
                id
            }
        })
        return res.send('The brand was removed successfully')
    } catch (err) {
        console.log('ERROR in deleteBrand', err);
    }
}

module.exports = {
    getBrands,
    postBrands,
    updateBrands,
    deleteBrands
}