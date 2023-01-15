const path = require('path');
const {Router} = require('express');
const products = require('./products');
import categories from './categories';
const brands = require('./brands');
const packing = require('./packing');
const user= require('./user/user');
const offers = require('./offers');
const resetDb = require('./resetDb');

const router = Router();

router.use('/products', products);
router.use('/categories', categories);
router.use('/brands', brands);
router.use('/packing', packing);
router.use('/user',user);
router.use('/offers', offers);
router.use('/resetdb', resetDb);

router.get("*", (_: any, res: any) => {
    res.sendFile(path.join(__dirname, '../../client/index.html'));
});

export default router;
