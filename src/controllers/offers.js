require('dotenv').config();
const { Offer } = require('../db');
const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
const fs = require('fs-extra');


async function getOffers(req, res) {
    try {
        const offers = await Offer.findAll()
        return res.send(offers);
    } catch (err) {
        console.log('ERROR in getOffers', err);
    }
}

async function postOffer(req, res) {
    const { status, slug, productId } = req.body;
    const image = req.file? req.file.filename : undefined;
    try {
        if (status && image && productId) {
            const result = await cloudinary.v2.uploader.upload(req.file.path);
            const createdOffer = await Offer.create({
                status,
                image: result.secure_url,
                slug
            });
            createdOffer.setProduct(productId);
            await fs.unlink(req.file.path);
            res.send(createdOffer);
        } else {
            res.status(422).send({ error: 'Fields status, image and productId are required' })
        }
    } catch (err) {
        console.log('ERROR in postOffer', err);
    }
}

async function updateOffer(req, res) {
    const { id, status, slug, productId } = req.body;
    const image = req.file? req.file.filename : undefined;
    if (!id) return res.status(422).send({ error: 'The offer id is required' });

    try {
        const offer = await Offer.findByPk(id);
        if (!offer) return res.status(422).send({ error: 'The offer id is wrong' });
        status ? offer.status = status : offer.status = offer.status;
        image ? offer.image = image : offer.image = offer.image;
        slug ? offer.slug = slug : offer.slug = offer.slug;
        productId ? offer.productId = productId : offer.productId = offer.productId;
        await offer.save();
        return res.send('The offer has been updated suscesfully');
    } catch (err) {
        console.log('ERROR in updateOffer', err);
    }
}

async function deleteOffer(req, res) {
    const { id } = req.body;
    if (!id) return res.send({ error: 'The offer id is required' })
    const offer = await Offer.findByPk(id)
    if (!offer) return res.send({ error: 'There is not any offer with this id' })
    try {
        await Offer.destroy({
            where: {
                id
            }
        })
        return res.send('The offer was removed successfully')
    } catch (err) {
        console.log('ERROR in deleteOffer', err);
    }
}

module.exports = {
    getOffers,
    postOffer,
    updateOffer,
    deleteOffer
}