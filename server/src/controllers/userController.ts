import { Request, Response } from 'express';
import { getUserById, addUser, upgradeUser, authorizeUser, User } from '../services/userService';

/**
 * Получить пользователя по ID
 * @param req - объект запроса Express
 * @param res - объект ответа Express
 * @returns {Promise<void>} Отправляет пользователя или ошибку
 */
export const getUserByIdController = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = parseInt(req.params.id, 10);
        if (isNaN(userId)) {
            res.status(400).json({ error: 'Некорректный ID пользователя' });
            return;
        }

        const user = await getUserById(userId);
        if (!user) {
            res.status(404).json({ error: 'Пользователь не найден' });
            return;
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Ошибка в getUserByIdController:', error);
        res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
};

/**
 * Добавить нового пользователя
 * @remarks Этот метод потенциально будет использоваться в будущем при получении доступа к базам данных HSE
 * @param req - объект запроса Express
 * @param res - объект ответа Express
 * @returns {Promise<void>} Отправляет созданного пользователя или ошибку
 */
export const addUserController = async (req: Request, res: Response): Promise<void> => {
    try {
        const userData: Omit<User, 'id' | 'created_date'> = req.body;

        // Проверка обязательных полей
        if (!userData.login || !userData.password || !userData.role) {
            res.status(400).json({ error: 'Необходимо указать login, password и role' });
            return;
        }

        // Проверка корректности роли
        if (!['user', 'creator'].includes(userData.role)) {
            res.status(400).json({ error: 'Некорректное значение role. Должно быть "user" или "creator"' });
            return;
        }

        const newUser = await addUser(userData);
        res.status(201).json(newUser);
    } catch (error: any) {
        console.error('Ошибка в addUserController:', error);
        if (error.message === 'Пользователь с таким логином уже существует') {
            res.status(409).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Не удалось добавить пользователя' });
        }
    }
};

/**
 * Обновить данные пользователя
 * @remarks Этот метод потенциально будет использоваться в будущем при получении доступа к базам данных HSE
 * @param req - объект запроса Express
 * @param res - объект ответа Express
 * @returns {Promise<void>} Отправляет обновленного пользователя или ошибку
 */
export const updateUserController = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = parseInt(req.params.id, 10);
        if (isNaN(userId)) {
            res.status(400).json({ error: 'Некорректный ID пользователя' });
            return;
        }

        const userData: Partial<Omit<User, 'id' | 'created_date'>> = req.body;

        // Проверка, предоставлены ли данные для обновления
        if (Object.keys(userData).length === 0) {
            res.status(400).json({ error: 'Не предоставлены данные для обновления' });
            return;
        }

        // Проверка корректности роли, если она указана
        if (userData.role && !['user', 'creator'].includes(userData.role)) {
            res.status(400).json({ error: 'Некорректное значение role. Должно быть "user" или "creator"' });
            return;
        }

        const updatedUser = await upgradeUser(userId, userData);
        if (!updatedUser) {
            res.status(404).json({ error: 'Пользователь не найден' });
            return;
        }

        res.status(200).json(updatedUser);
    } catch (error: any) {
        console.error('Ошибка в updateUserController:', error);
        if (error.message === 'Пользователь с таким ID не найден') {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Не удалось обновить пользователя' });
        }
    }
};

/**
 * Авторизация пользователя
 * @param req - объект запроса Express
 * @param res - объект ответа Express
 * @returns {Promise<void>} Отправляет пользователя или ошибку
 */
export const authorizeUserController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { login, password } = req.body;

        if (!login || !password) {
            res.status(400).json({ error: 'Необходимо указать login и password' });
            return;
        }

        const user = await authorizeUser(login, password);
        if (!user) {
            res.status(401).json({ error: 'Неверный логин или пароль' });
            return;
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Ошибка в authorizeUserController:', error);
        res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
};
