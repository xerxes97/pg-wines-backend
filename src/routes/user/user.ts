import { Router } from 'express';

import { getAllUsers, updateUser, deleteUser, loginUser } from '../../controllers/user/user';

const router = Router();

router.get('/users', getAllUsers);
router.get('/users/login', loginUser);
router.put('/users/:idUser', updateUser); 
router.delete('/users/:idUser', deleteUser); 

export default router;