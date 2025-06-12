import express from 'express';
import * as userController from '../controllers/userController';

const router = express.Router();

router.get('/:id', userController.getUserById);
router.post('/register', userController.registerUser);
router.post('/login', userController.authorizeUser);

export default router;