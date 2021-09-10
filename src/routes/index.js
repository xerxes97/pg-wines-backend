const path = require('path');
const {Router} = require('express');
const products = require('./products');
const categories = require('./categories');
const brands = require('./brands');
const packing = require('./packing');
const offers = require('./offers');

const router = Router();

router.use('/products', products);
router.use('/categories', categories);
router.use('/brands', brands);
router.use('/packing', packing);
router.use('/offers', offers);

router.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/index.html'));
});

module.exports = router;
