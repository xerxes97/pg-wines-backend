
import { Router } from 'express';
import { resetDb } from '../../controllers/resetDb';

const router = Router();

router.get('/', resetDb);

export default router;