const { Router } = require('express');

const { getAllUsers, updateUser, deleteUser, loginUser } = require('../../controllers/user/user')


const router = Router();

router.get('/users', getAllUsers);
router.get('/users/login', loginUser);
router.put('/users/:idUser', updateUser); 
router.delete('/users/:idUser', deleteUser); 

module.exports = router;