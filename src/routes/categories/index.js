const { Router } = require('express');
const router = Router();
const { getCategories, postCategory, updateCategory, deleteCategory } = require('../../controllers/categories')

router.get('/', getCategories);
router.post('/', postCategory);
router.put('/update', updateCategory);
router.delete('/delete', deleteCategory);

module.exports = router;