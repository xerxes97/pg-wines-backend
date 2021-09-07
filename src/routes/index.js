const path = require('path');
const {Router} = require('express');
const products = require('./products');
const categories = require('./categories')

const router = Router();

router.use('/products', products);
router.use('/categories', categories);

router.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/index.html'));
});

module.exports = router;
