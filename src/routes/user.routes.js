import { Router } from 'express';
import * as userController from '../controllers/user.controller.js';

const router = Router();

router.get('/usuarios', userController.getUsers);
router.get('/usuarios/:id', userController.getUser);
router.post('/usuarios', userController.createUser);
router.put('/usuarios/:id', userController.updateUser);
router.delete('/usuarios/:id', userController.deleteUser);
router.get('/usuarios/:id/pedidos', userController.getUserWithOrders);
router.post('/usuarios-con-orden', userController.createUserWithOrder);

export default router;
