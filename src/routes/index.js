const {Router} = require('express');
const products = require('./products');

const router = Router();

router.use('/', products);

module.exports = router;
