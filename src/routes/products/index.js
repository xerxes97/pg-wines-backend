const { Router } = require('express');
const router = Router();
const { getProducts, getProductById, postProduct, updateProduct, deleteProduct } = require('../../controllers/products')
const { getCategories, postCategory } = require('../../controllers/categories')

router.get('/products', getProducts);
router.get('/categories', getCategories);
router.get('/product/:id', getProductById);
router.post('/category', postCategory);
router.post('/product', postProduct);
router.put('/product/update',updateProduct);
router.delete('/product/delete',deleteProduct);

module.exports = router;