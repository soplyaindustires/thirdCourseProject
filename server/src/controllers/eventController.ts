import { Request, Response } from 'express';
import {
    getAllEvents,
    getEventById,
    addEvent,
    updateEvent,
    joinEvent,
    leaveEvent,
    HseEvent,
} from '../services/eventService';

/**
 * Получить все события
 * @param req - объект запроса Express
 * @param res - объект ответа Express
 * @returns {Promise<void>} Отправляет массив всех событий или ошибку
 */
export const getAllEventsController = async (req: Request, res: Response): Promise<void> => {
    try {
        const events = await getAllEvents();
        res.status(200).json(events);
    } catch (error) {
        console.error('Ошибка в getAllEventsController:', error);
        res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
};

/**
 * Получить событие по ID
 * @param req - объект запроса Express
 * @param res - объект ответа Express
 * @returns {Promise<void>} Отправляет событие или ошибку
 */
export const getEventByIdController = async (req: Request, res: Response): Promise<void> => {
    try {
        const eventId = parseInt(req.params.id, 10);
        if (isNaN(eventId)) {
            res.status(400).json({ error: 'Некорректный ID события' });
            return;
        }

        const event = await getEventById(eventId);
        if (!event) {
            res.status(404).json({ error: 'Событие не найдено' });
            return;
        }

        res.status(200).json(event);
    } catch (error) {
        console.error('Ошибка в getEventByIdController:', error);
        res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
};

/**
 * Добавить новое событие
 * @remarks Этот метод потенциально будет использоваться в будущем при получении доступа к базам данных HSE
 * @param req - объект запроса Express
 * @param res - объект ответа Express
 * @returns {Promise<void>} Отправляет созданное событие или ошибку
 */
export const addEventController = async (req: Request, res: Response): Promise<void> => {
    try {
        const eventData: Omit<HseEvent, 'id'> = req.body;

        // Проверка обязательных полей
        if (!eventData.title || !eventData.start || !eventData.end || !eventData.creator_id) {
            res.status(400).json({ error: 'Необходимо указать title, start, end и creator_id' });
            return;
        }

        const newEvent = await addEvent(eventData);
        res.status(201).json(newEvent);
    } catch (error: any) {
        console.error('Ошибка в addEventController:', error);
        if (error.message === 'Создатель события не найден') {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Не удалось добавить событие' });
        }
    }
};

/**
 * Обновить данные события
 * @remarks Этот метод потенциально будет использоваться в будущем при получении доступа к базам данных HSE
 * @param req - объект запроса Express
 * @param res - объект ответа Express
 * @returns {Promise<void>} Отправляет обновленное событие или ошибку
 */
export const updateEventController = async (req: Request, res: Response): Promise<void> => {
    try {
        const eventId = parseInt(req.params.id, 10);
        if (isNaN(eventId)) {
            res.status(400).json({ error: 'Некорректный ID события' });
            return;
        }

        const eventData: Partial<Omit<HseEvent, 'id'>> = req.body;

        // Проверка, предоставлены ли данные для обновления
        if (Object.keys(eventData).length === 0) {
            res.status(400).json({ error: 'Не предоставлены данные для обновления' });
            return;
        }

        const updatedEvent = await updateEvent(eventId, eventData);
        if (!updatedEvent) {
            res.status(404).json({ error: 'Событие не найдено' });
            return;
        }

        res.status(200).json(updatedEvent);
    } catch (error: any) {
        console.error('Ошибка в updateEventController:', error);
        if (error.message === 'Событие с таким ID не найдено' || error.message === 'Создатель события не найден') {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Не удалось обновить событие' });
        }
    }
};

/**
 * Записать пользователя на событие
 * @param req - объект запроса Express
 * @param res - объект ответа Express
 * @returns {Promise<void>} Отправляет подтверждение или ошибку
 */
export const joinEventController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, eventId } = req.body;

        if (!userId || !eventId) {
            res.status(400).json({ error: 'Необходимо указать userId и eventId' });
            return;
        }

        await joinEvent(userId, eventId);
        res.status(200).json({ message: 'Успешно записан на событие' });
    } catch (error: any) {
        console.error('Ошибка в joinEventController:', error);
        if (
            error.message === 'Пользователь не найден' ||
            error.message === 'Событие не найдено' ||
            error.message === 'Пользователь уже записан на событие'
        ) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Не удалось записаться на событие' });
        }
    }
};

/**
 * Отписать пользователя от события
 * @param req - объект запроса Express
 * @param res - объект ответа Express
 * @returns {Promise<void>} Отправляет подтверждение или ошибку
 */
export const leaveEventController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, eventId } = req.body;

        if (!userId || !eventId) {
            res.status(400).json({ error: 'Необходимо указать userId и eventId' });
            return;
        }

        await leaveEvent(userId, eventId);
        res.status(200).json({ message: 'Успешно отписан от события' });
    } catch (error: any) {
        console.error('Ошибка в leaveEventController:', error);
        if (error.message === 'Пользователь не найден' || error.message === 'Событие не найдено') {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Не удалось отписаться от события' });
        }
    }
};
