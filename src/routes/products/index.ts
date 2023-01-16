import { Router } from 'express';
import { getProducts, getProductById, postProduct, updateProduct, deleteProduct } from '../../controllers/products';

const router = Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', postProduct);
router.put('/update',updateProduct);
router.delete('/delete',deleteProduct);

export default router;