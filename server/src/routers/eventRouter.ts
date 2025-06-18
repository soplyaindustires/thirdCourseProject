import { Router } from 'express';
import {
    getAllEventsController,
    getEventByIdController,
    addEventController,
    updateEventController,
    joinEventController,
    leaveEventController,
} from '../controllers/eventController';

/**
 * Экземпляр маршрутизатора Express для обработки запросов, связанных с событиями
 * @constant eventRouter
 */
const eventRouter = Router();

/**
 * Маршрут для получения всех событий
 * @method GET
 * @path /
 */
eventRouter.get('/', getAllEventsController);

/**
 * Маршрут для получения события по ID
 * @method GET
 * @path /:id
 */
eventRouter.get('/:id', getEventByIdController);

/**
 * Маршрут для добавления нового события
 * @remarks Этот метод потенциально будет использоваться в будущем при получении доступа к базам данных HSE
 * @method POST
 * @path /
 */
eventRouter.post('/', addEventController);

/**
 * Маршрут для обновления данных события
 * @remarks Этот метод потенциально будет использоваться в будущем при получении доступа к базам данных HSE
 * @method PUT
 * @path /:id
 */
eventRouter.put('/:id', updateEventController);

/**
 * Маршрут для записи пользователя на событие
 * @method POST
 * @path /join
 */
eventRouter.post('/join', joinEventController);

/**
 * Маршрут для отписки пользователя от события
 * @method POST
 * @path /leave
 */
eventRouter.post('/leave', leaveEventController);

export default eventRouter;
