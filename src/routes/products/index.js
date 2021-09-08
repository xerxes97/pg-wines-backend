const { Router } = require('express');
const router = Router();
const { getProducts, getProductById, postProduct, updateProduct, deleteProduct } = require('../../controllers/products')

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', postProduct);
router.put('/update',updateProduct);
router.delete('/delete',deleteProduct);

module.exports = router;