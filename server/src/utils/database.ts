import { Pool } from 'pg';

/**
 * Интерфейс для конфигурации подключения к базе данных
 * @interface DbConfig
 */
interface DbConfig {
    user: string;
    host: string;
    database: string;
    password: string;
    port: number;
}

/**
 * Интерфейс для параметров выборки
 * @interface SelectOptions
 */
interface SelectOptions {
    columns?: string[];
    where?: Record<string, number | string>;
}

/**
 * Интерфейс для ответа на запрос
 * @interface QueryResponse
 */
interface QueryResponse {
    status: number;
    dataLength?: number;
    data?: any[];
    error: boolean;
}

/**
 * Инициализация пула подключений к базе данных
 * @constant pool
 */
const pool = new Pool({
    user: '',
    host: 'localhost',
    database: '',
    password: '',
    port: 4000,
} as DbConfig);

/**
 * Проверяет, является ли объект пустым
 * @param object Объект для проверки
 * @returns {boolean} true, если объект пустой
 */
const isObjectEmpty = (object: Record<string, any>): boolean => {
    return Object.keys(object).length === 0;
};

/**
 * Выполняет простой SELECT запрос к базе данных
 * @param from Название таблицы
 * @param options Параметры запроса
 * @returns {Promise<QueryResponse>} Результат запроса
 * @throws {Error} Если where-условие сформировано неверно
 */
const simpleSelect = async (from: string, options: SelectOptions = {}): Promise<QueryResponse> => {
    let whereClause: string | null = null;
    let columns: string = '*';

    // Обработка выбора столбцов
    if (options.columns && !isObjectEmpty(options.columns)) {
        columns = options.columns.join(',');
    }

    // Формирование where-условия
    if (options.where && !isObjectEmpty(options.where)) {
        whereClause = '';
        let i = 0;

        for (const [key, value] of Object.entries(options.where)) {
            if (i >= 1) {
                whereClause += ' AND ';
            }

            // Проверка типов
            if (!(typeof value === 'number' || typeof value === 'string')) {
                throw new Error('where-условие сформировано неверно');
            }

            const formattedValue = typeof value === 'string' ? `'${value}'` : value;
            whereClause += `${key}=${formattedValue}`;
            i++;
        }
    }

    const queryString = `SELECT ${columns} FROM ${from} ${whereClause ? `WHERE ${whereClause}` : ''}`;

    try {
        const result = await pool.query(queryString);
        return {
            status: 200,
            //@ts-ignore
            dataLength: result.rowCount,
            data: result.rows,
            error: false,
        };
    } catch (error) {
        console.error(error);
        return {
            status: 400,
            error: true,
        };
    }
};

export { pool, simpleSelect, QueryResponse, SelectOptions };
