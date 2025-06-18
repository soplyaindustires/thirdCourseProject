import { pool, simpleSelect, QueryResponse, SelectOptions } from '../utils/database';

/**
 * Интерфейс события, соответствующий структуре таблицы events
 * @interface HseEvent
 */
interface HseEvent {
    id: number;
    title: string;
    description?: string;
    start: string;
    end: string;
    place?: string;
    creator_id: number;
    info_url?: string;
    registration_url?: string;
}

/**
 * Получить все события
 * @returns {Promise<HseEvent[]>} Массив всех событий
 */
export const getAllEvents = async (): Promise<HseEvent[]> => {
    const result: QueryResponse = await simpleSelect('events');

    if (result.status === 200 && result.data) {
        return result.data as HseEvent[];
    }
    return [];
};

/**
 * Получить событие по ID
 * @param eventId - числовой идентификатор события
 * @returns {Promise<HseEvent | undefined>} Найденное событие или undefined
 */
export const getEventById = async (eventId: number): Promise<HseEvent | undefined> => {
    const options: SelectOptions = {
        where: { id: eventId },
    };

    const result: QueryResponse = await simpleSelect('events', options);

    if (result.status === 200 && result.data && result.data.length > 0) {
        return result.data[0] as HseEvent;
    }
    return undefined;
};

/**
 * Добавить новое событие в базу данных
 * @remarks Этот метод потенциально будет использоваться в будущем при получении доступа к базам данных HSE
 * @param eventData - данные о событии без id
 * @returns {Promise<HseEvent>} Созданное событие
 * @throws {Error} Если произошла ошибка при добавлении
 */
export const addEvent = async (eventData: Omit<HseEvent, 'id'>): Promise<HseEvent> => {
    const { title, description, start, end, place, creator_id, info_url, registration_url } = eventData;

    // Проверка на существование создателя
    const creatorCheck: QueryResponse = await simpleSelect('users', {
        where: { id: creator_id },
    });

    if (creatorCheck.status !== 200 || !creatorCheck.data || creatorCheck.data.length === 0) {
        throw new Error('Создатель события не найден');
    }

    // Формирование SQL запроса для вставки нового события
    const query = `
    INSERT INTO events (title, description, start, "end", place, creator_id, info_url, registration_url)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *;
  `;
    const values = [title, description, start, end, place, creator_id, info_url, registration_url];

    try {
        const result = await pool.query(query, values);
        return result.rows[0] as HseEvent;
    } catch (error) {
        console.error('Ошибка при добавлении события:', error);
        throw new Error('Не удалось добавить событие');
    }
};

/**
 * Обновить данные события
 * @remarks Этот метод потенциально будет использоваться в будущем при получении доступа к базам данных HSE
 * @param eventId - числовой идентификатор события
 * @param eventData - обновляемые данные события
 * @returns {Promise<HseEvent | undefined>} Обновленное событие или undefined, если событие не найдено
 * @throws {Error} Если произошла ошибка при обновлении
 */
export const updateEvent = async (
    eventId: number,
    eventData: Partial<Omit<HseEvent, 'id'>>
): Promise<HseEvent | undefined> => {
    const { title, description, start, end, place, creator_id, info_url, registration_url } = eventData;

    // Проверка на существование события
    const existingEvent = await getEventById(eventId);
    if (!existingEvent) {
        throw new Error('Событие с таким ID не найдено');
    }

    // Проверка на существование создателя, если он указан
    if (creator_id !== undefined) {
        const creatorCheck: QueryResponse = await simpleSelect('users', {
            where: { id: creator_id },
        });
        if (creatorCheck.status !== 200 || !creatorCheck.data || creatorCheck.data.length === 0) {
            throw new Error('Создатель события не найден');
        }
    }

    // Формирование SQL запроса для обновления события
    const updates: string[] = [];
    const values: (string | number | undefined)[] = [];
    let paramIndex = 1;

    if (title !== undefined) {
        updates.push(`title = $${paramIndex++}`);
        values.push(title);
    }
    if (description !== undefined) {
        updates.push(`description = $${paramIndex++}`);
        values.push(description);
    }
    if (start !== undefined) {
        updates.push(`start = $${paramIndex++}`);
        values.push(start);
    }
    if (end !== undefined) {
        updates.push(`"end" = $${paramIndex++}`);
        values.push(end);
    }
    if (place !== undefined) {
        updates.push(`place = $${paramIndex++}`);
        values.push(place);
    }
    if (creator_id !== undefined) {
        updates.push(`creator_id = $${paramIndex++}`);
        values.push(creator_id);
    }
    if (info_url !== undefined) {
        updates.push(`info_url = $${paramIndex++}`);
        values.push(info_url);
    }
    if (registration_url !== undefined) {
        updates.push(`registration_url = $${paramIndex++}`);
        values.push(registration_url);
    }

    if (updates.length === 0) {
        return existingEvent; // Ничего не обновляем, если нет данных
    }

    const query = `
    UPDATE events
    SET ${updates.join(', ')}
    WHERE id = $${paramIndex}
    RETURNING *;
  `;
    values.push(eventId);

    try {
        const result = await pool.query(query, values);
        return result.rows[0] as HseEvent;
    } catch (error) {
        console.error('Ошибка при обновлении события:', error);
        throw new Error('Не удалось обновить событие');
    }
};

/**
 * Пользователь записывается на событие
 * @param userId - числовой идентификатор пользователя
 * @param eventId - числовой идентификатор события
 * @returns {Promise<void>}
 * @throws {Error} Если пользователь или событие не найдены, или пользователь уже записан
 */
export const joinEvent = async (userId: number, eventId: number): Promise<void> => {
    // Проверка на существование пользователя
    const userCheck: QueryResponse = await simpleSelect('users', {
        where: { id: userId },
    });
    if (userCheck.status !== 200 || !userCheck.data || userCheck.data.length === 0) {
        throw new Error('Пользователь не найден');
    }

    // Проверка на существование события
    const eventCheck: QueryResponse = await simpleSelect('events', {
        where: { id: eventId },
    });
    if (eventCheck.status !== 200 || !eventCheck.data || eventCheck.data.length === 0) {
        throw new Error('Событие не найдено');
    }

    // Проверка, не записан ли пользователь уже
    const participantCheck: QueryResponse = await simpleSelect('event_participants', {
        where: { user_id: userId, event_id: eventId },
    });
    if (participantCheck.status === 200 && participantCheck.data && participantCheck.data.length > 0) {
        throw new Error('Пользователь уже записан на событие');
    }

    // Добавление записи в таблицу event_participants
    const query = `
    INSERT INTO event_participants (user_id, event_id)
    VALUES ($1, $2);
  `;
    const values = [userId, eventId];

    try {
        await pool.query(query, values);
    } catch (error) {
        console.error('Ошибка при записи на событие:', error);
        throw new Error('Не удалось записаться на событие');
    }
};

/**
 * Пользователь отписывается от события
 * @param userId - числовой идентификатор пользователя
 * @param eventId - числовой идентификатор события
 * @returns {Promise<void>}
 * @throws {Error} Если пользователь или событие не найдены
 */
export const leaveEvent = async (userId: number, eventId: number): Promise<void> => {
    // Проверка на существование пользователя
    const userCheck: QueryResponse = await simpleSelect('users', {
        where: { id: userId },
    });
    if (userCheck.status !== 200 || !userCheck.data || userCheck.data.length === 0) {
        throw new Error('Пользователь не найден');
    }

    // Проверка на существование события
    const eventCheck: QueryResponse = await simpleSelect('events', {
        where: { id: eventId },
    });
    if (eventCheck.status !== 200 || !eventCheck.data || eventCheck.data.length === 0) {
        throw new Error('Событие не найдено');
    }

    // Удаление записи из таблицы event_participants
    const query = `
    DELETE FROM event_participants
    WHERE user_id = $1 AND event_id = $2;
  `;
    const values = [userId, eventId];

    try {
        await pool.query(query, values);
    } catch (error) {
        console.error('Ошибка при отписке от события:', error);
        throw new Error('Не удалось отписаться от события');
    }
};

export { HseEvent };
