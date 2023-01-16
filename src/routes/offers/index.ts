import { Router } from 'express';
import { getOffers, postOffer, updateOffer, deleteOffer } from '../../controllers/offers';

const router = Router();

router.get('/', getOffers);
router.post('/', postOffer);
router.put('/update', updateOffer);
router.delete('/delete', deleteOffer);

export default router;