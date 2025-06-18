import { Router } from 'express';
import {
    getUserByIdController,
    addUserController,
    updateUserController,
    authorizeUserController,
} from '../controllers/userController';

/**
 * Экземпляр маршрутизатора Express для обработки запросов, связанных с пользователями
 * @constant userRouter
 */
const userRouter = Router();

/**
 * Маршрут для получения пользователя по ID
 * @method GET
 * @path /:id
 */
userRouter.get('/:id', getUserByIdController);

/**
 * Маршрут для добавления нового пользователя
 * @remarks Этот метод потенциально будет использоваться в будущем при получении доступа к базам данных HSE
 * @method POST
 * @path /
 */
userRouter.post('/', addUserController);

/**
 * Маршрут для обновления данных пользователя
 * @remarks Этот метод потенциально будет использоваться в будущем при получении доступа к базам данных HSE
 * @method PUT
 * @path /:id
 */
userRouter.put('/:id', updateUserController);

/**
 * Маршрут для авторизации пользователя
 * @method POST
 * @path /authorize
 */
userRouter.post('/authorize', authorizeUserController);

export default userRouter;
