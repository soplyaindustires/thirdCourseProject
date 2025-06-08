import express from 'express';
import * as eventController from '../controllers/eventController';

const router = express.Router();

router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.getEventById);
router.post('/join', eventController.joinEvent);
router.post('/leave', eventController.leaveEvent);

export default router;