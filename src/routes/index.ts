import path from 'path';
import { Router } from 'express';
import products from './products';
import categories from './categories';
import brands from './brands';
import packing from './packing';
import user from './user/user';
import offers from './offers';
import resetDb from './resetDb';

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
