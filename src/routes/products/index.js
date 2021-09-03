const { Router } = require('express');
const router = Router();
const { getProducts, getProductById } = require('../../controllers/products')
const { getCategories } = require('../../controllers/categories')

router.get('/products', getProducts);
router.get('/categories', getCategories);
router.get('/product/:id', getProductById);


module.exports = router;