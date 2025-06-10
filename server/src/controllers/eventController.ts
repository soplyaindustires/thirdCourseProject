import { Request, Response } from 'express';
import * as eventService from '../services/eventService';

export const getAllEvents = (_req: Request, res: Response) => {
  res.send(eventService.getAllEvents());
};

export const getEventById = (req: Request, res: Response) => {
  const eventId = parseInt(req.params.id, 10);
  const event = eventService.getEventById(eventId);
  if (!event) return res.status(404).send({ error: 'Событие не найдено' });
  res.send(event);
};

export const joinEvent = (req: Request, res: Response) => {
  const { userId, eventId } = req.body;
  eventService.joinEvent(userId, eventId);
  res.send({ success: true });
};

export const leaveEvent = (req: Request, res: Response) => {
  const { userId, eventId } = req.body;
  eventService.leaveEvent(userId, eventId);
  res.send({ success: true });
};