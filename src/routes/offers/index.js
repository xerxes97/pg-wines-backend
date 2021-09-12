const { Router } = require('express');
const router = Router();
const { getOffers, postOffer, updateOffer, deleteOffer } = require('../../controllers/offers')

router.get('/', getOffers);
router.post('/', postOffer);
router.put('/update', updateOffer);
router.delete('/delete', deleteOffer);

module.exports = router;