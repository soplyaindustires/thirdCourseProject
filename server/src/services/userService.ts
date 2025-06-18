import { pool, simpleSelect, QueryResponse, SelectOptions } from '../utils/database';

/**
 * Интерфейс пользователя, соответствующий структуре таблицы users
 * @interface User
 */
interface User {
    id: number;
    login: string;
    password: string;
    role: 'user' | 'creator';
    full_name?: string;
    educational_program?: string;
    group_number?: string;
    course?: number;
    created_date: string;
}

/**
 * Получить пользователя по ID
 * @param userId - числовой идентификатор пользователя
 * @returns {Promise<User | undefined>} Найденный пользователь или undefined
 */
export const getUserById = async (userId: number): Promise<User | undefined> => {
    const options: SelectOptions = {
        where: { id: userId },
    };

    const result: QueryResponse = await simpleSelect('users', options);

    if (result.status === 200 && result.data && result.data.length > 0) {
        return result.data[0] as User;
    }
    return undefined;
};

/**
 * Добавить нового пользователя в базу данных
 * @remarks Этот метод потенциально будет использоваться в будущем при получении доступа к базам данных HSE
 * @param userData - данные о пользователе без id и даты создания
 * @returns {Promise<User>} Созданный пользователь
 * @throws {Error} Если произошла ошибка при добавлении
 */
export const addUser = async (userData: Omit<User, 'id' | 'created_date'>): Promise<User> => {
    const { login, password, role, full_name, educational_program, group_number, course } = userData;

    // Проверка на существование пользователя с таким логином
    const existingUserCheck: QueryResponse = await simpleSelect('users', {
        where: { login },
    });

    if (existingUserCheck.status === 200 && existingUserCheck.data && existingUserCheck.data.length > 0) {
        throw new Error('Пользователь с таким логином уже существует');
    }

    // Формирование SQL запроса для вставки нового пользователя
    const query = `
    INSERT INTO users (login, password, role, full_name, educational_program, group_number, course)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
  `;
    const values = [login, password, role, full_name, educational_program, group_number, course];

    try {
        const result = await pool.query(query, values);
        return result.rows[0] as User;
    } catch (error) {
        console.error('Ошибка при добавлении пользователя:', error);
        throw new Error('Не удалось добавить пользователя');
    }
};

/**
 * Обновить данные пользователя
 * @remarks Этот метод потенциально будет использоваться в будущем при получении доступа к базам данных HSE
 * @param userId - числовой идентификатор пользователя
 * @param userData - обновляемые данные пользователя
 * @returns {Promise<User | undefined>} Обновленный пользователь или undefined, если пользователь не найден
 * @throws {Error} Если произошла ошибка при обновлении
 */
export const upgradeUser = async (
    userId: number,
    userData: Partial<Omit<User, 'id' | 'created_date'>>
): Promise<User | undefined> => {
    const { login, password, role, full_name, educational_program, group_number, course } = userData;

    // Проверка на существование пользователя
    const existingUser = await getUserById(userId);
    if (!existingUser) {
        throw new Error('Пользователь с таким ID не найден');
    }

    // Формирование SQL запроса для обновления пользователя
    const updates: string[] = [];
    const values: (string | number | undefined)[] = [];
    let paramIndex = 1;

    if (login !== undefined) {
        updates.push(`login = $${paramIndex++}`);
        values.push(login);
    }
    if (password !== undefined) {
        updates.push(`password = $${paramIndex++}`);
        values.push(password);
    }
    if (role !== undefined) {
        updates.push(`role = $${paramIndex++}`);
        values.push(role);
    }
    if (full_name !== undefined) {
        updates.push(`full_name = $${paramIndex++}`);
        values.push(full_name);
    }
    if (educational_program !== undefined) {
        updates.push(`educational_program = $${paramIndex++}`);
        values.push(educational_program);
    }
    if (group_number !== undefined) {
        updates.push(`group_number = $${paramIndex++}`);
        values.push(group_number);
    }
    if (course !== undefined) {
        updates.push(`course = $${paramIndex++}`);
        values.push(course);
    }

    if (updates.length === 0) {
        return existingUser; // Ничего не обновляем, если нет данных
    }

    const query = `
    UPDATE users
    SET ${updates.join(', ')}
    WHERE id = $${paramIndex}
    RETURNING *;
  `;
    values.push(userId);

    try {
        const result = await pool.query(query, values);
        return result.rows[0] as User;
    } catch (error) {
        console.error('Ошибка при обновлении пользователя:', error);
        throw new Error('Не удалось обновить пользователя');
    }
};

/**
 * Авторизация пользователя
 * @param login - логин (email)
 * @param password - пароль
 * @returns {Promise<User | undefined>} Пользователь, если найден, иначе undefined
 */
export const authorizeUser = async (login: string, password: string): Promise<User | undefined> => {
    const options: SelectOptions = {
        where: { login, password },
    };

    const result: QueryResponse = await simpleSelect('users', options);

    if (result.status === 200 && result.data && result.data.length > 0) {
        return result.data[0] as User;
    }
    return undefined;
};

export { User };
