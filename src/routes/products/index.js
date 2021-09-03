const { Router } = require('express');
const router = Router();
const { getProducts } = require('../../controllers/products')
const { getCategories } = require('../../controllers/categories')

router.get('/products', getProducts);
router.get('/categories', getCategories);


module.exports = router;