const { Router } = require('express');
const router = Router();
const { getBrands, postBrands, updateBrands, deleteBrand } = require('../../controllers/brands')

router.get('/', getBrands);
router.post('/', postBrands);
router.put('/', updateBrands);
router.delete('/', deleteBrand);

module.exports = router;