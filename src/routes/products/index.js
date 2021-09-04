const { Router } = require('express');
const router = Router();
const { getProducts, getProductById, postProduct } = require('../../controllers/products')
const { getCategories, postCategory } = require('../../controllers/categories')

router.get('/products', getProducts);
router.get('/categories', getCategories);
router.get('/product/:id', getProductById);
router.post('/category', postCategory);
router.post('/product', postProduct);

module.exports = router;