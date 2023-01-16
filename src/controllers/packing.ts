import db from '../db'

const {Packing} = db;

export const getPacking = async (_: any, res: any) => {
    try {
        const packing = await Packing.findAll()
        return res.send(packing);
    } catch (err) {
        console.log('ERROR in getPacking', err);
    }
}

export const postPacking = async (req: any, res: any) => {
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

export const updatePacking = async (req: any, res: any) => {
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

export const deletePacking = async (req: any, res: any) => {
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