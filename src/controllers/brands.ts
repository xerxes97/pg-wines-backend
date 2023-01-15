import db from '../db'

const {Brand} = db;

export const getBrands = async (_: any, res: any) => {
    try {
        const brands = await Brand.findAll()
        return res.send(brands);
    } catch (err) {
        console.log('ERROR in getBrands', err);
    }
}

export const postBrands = async (req: any, res: any) => {
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

export const updateBrands = async (req: any, res: any) => {
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

export const deleteBrands = async (req: any, res: any) => {
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