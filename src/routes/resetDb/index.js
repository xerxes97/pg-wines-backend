
const { Router } = require('express');
const router = Router();
const { resetDb } = require('../../controllers/resetDb');

router.get('/', resetDb);

module.exports = router;