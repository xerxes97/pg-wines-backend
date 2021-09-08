const { Router } = require('express');
const router = Router();
const { getBrands, postBrands, updateBrands, deleteBrands } = require('../../controllers/brands')

router.get('/', getBrands);
router.post('/', postBrands);
router.put('/', updateBrands);
router.delete('/', deleteBrands);

module.exports = router;