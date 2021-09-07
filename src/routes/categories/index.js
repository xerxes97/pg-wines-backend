const { Router } = require('express');
const router = Router();
const { getCategories, postCategory } = require('../../controllers/categories')

router.get('/', getCategories);
router.post('/', postCategory);

module.exports = router;