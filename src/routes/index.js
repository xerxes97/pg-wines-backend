const {Router} = require('express');
const products = require('./products');
const categories = require('./categories')

const router = Router();

router.use('/products', products);
router.use('/categories', categories);

module.exports = router;
