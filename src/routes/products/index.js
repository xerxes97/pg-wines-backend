const { Router } = require('express');
const router = Router();
const { getProducts } = require('../../controllers/products')

router.get('/products', getProducts);

module.exports = router;