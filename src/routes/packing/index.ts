import { Router } from 'express';
import { getPacking, postPacking, updatePacking, deletePacking } from '../../controllers/packing';

const router = Router();

router.get('/', getPacking);
router.post('/', postPacking);
router.put('/update', updatePacking);
router.delete('/delete', deletePacking);

export default router;