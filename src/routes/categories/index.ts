import { Router } from 'express';
import { getCategories, postCategory, updateCategory, deleteCategory } from '../../controllers/categories';
const router = Router();

router.get('/', getCategories);
router.post('/', postCategory);
router.put('/update', updateCategory);
router.delete('/delete', deleteCategory);

export default router;