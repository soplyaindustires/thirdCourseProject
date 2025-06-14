import express, { Router } from 'express';
import * as eventController from '../controllers/eventController';

const router: Router = express.Router();

/**
 * GET /api/events/:id
 * Получить событие по ID
 */
router.get('/:id', eventController.getEventById);

/**
 * POST /api/events/join
 * Пользователь записывается на событие
 */
router.post('/join', eventController.joinEvent);

/**
 * POST /api/events/leave
 * Пользователь отписывается от события
 */
router.post('/leave', eventController.leaveEvent);

export default router;