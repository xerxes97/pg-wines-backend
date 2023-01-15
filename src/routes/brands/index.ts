import { Router } from 'express';
import { getBrands, postBrands, updateBrands, deleteBrands } from '../../controllers/brands';

const router = Router();

router.get('/', getBrands);
router.post('/', postBrands);
router.put('/update', updateBrands);
router.delete('/delete', deleteBrands);

module.exports = router;