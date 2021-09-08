const path = require('path');
const {Router} = require('express');
const products = require('./products');
const categories = require('./categories');
const brands = require('./brands');

const router = Router();

router.use('/products', products);
router.use('/categories', categories);
router.use('/brands', brands);

router.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/index.html'));
});

module.exports = router;
