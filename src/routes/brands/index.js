const { Router } = require('express');
const router = Router();
const { getBrands, postBrands, updateBrands, deleteBrands } = require('../../controllers/brands')

router.get('/', getBrands);
router.post('/', postBrands);
router.put('/update', updateBrands);
router.delete('/delete', deleteBrands);

module.exports = router;