const { Router } = require('express');
const router = Router();
const { getPacking, postPacking, updatePacking, deletePacking } = require('../../controllers/packing')

router.get('/', getPacking);
router.post('/', postPacking);
router.put('/update', updatePacking);
router.delete('/delete', deletePacking);

module.exports = router;