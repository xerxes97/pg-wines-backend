const { Packing } = require('../db');

async function getPacking(req, res) {
    try {
        const packing = await Packing.findAll()
        return res.send(packing);
    } catch (err) {
        console.log('ERROR in getPacking', err);
    }
}

async function postPacking(req, res) {
    const { name } = req.body;
    try {
        if (name) {
            const createdPacking = await Packing.findOrCreate({
                where: { name: name }
            });
            res.send(createdPacking);
        } else {
            res.status(422).send({ error: 'The field name is required' })
        }
    } catch (err) {
        console.log('ERROR in postPacking', err);
    }
}

async function updatePacking(req, res) {
    const { id, name } = req.body;
    if (!id) return res.status(422).send({ error: 'The packing id is required' });
    if (!name) return res.status(422).send({ error: 'You should specified the new name.' });

    try {
        const packing = await Packing.findByPk(id);
        if (!packing) return res.status(422).send({ error: 'The packing id is wrong' });
        packing.name = name;
        await packing.save();
        return res.send('The packing has been updated suscesfully');
    } catch (err) {
        console.log('ERROR in updatePacking', err);
    }
}

async function deletePacking(req, res) {
    const { id } = req.body;
    if (!id) return res.send({ error: 'The packing id is required' })
    const packing = await Packing.findByPk(id)
    if (!packing) return res.send({ error: 'There is not any packing with this id' })
    try {
        await Packing.destroy({
            where: {
                id
            }
        })
        return res.send('The packing was removed successfully')
    } catch (err) {
        console.log('ERROR in deletePacking', err);
    }
}

module.exports = {
    getPacking,
    postPacking,
    updatePacking,
    deletePacking
}