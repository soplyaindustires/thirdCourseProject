/**
 * API-клиент для выполнения HTTP-запросов к серверу
 */
export class ApiClient {
    private baseUrl: string;

    /**
     * Создает экземпляр ApiClient
     * @param baseUrl - Базовый URL сервера
     */
    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    /**
     * Выполняет GET-запрос
     * @param endpoint - Конечная точка API
     * @returns Промис с данными ответа
     */
    async get<T>(endpoint: string): Promise<T> {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`Ошибка ${response.status}: ${await response.text()}`);
        }
        return response.json();
    }

    /**
     * Выполняет POST-запрос
     * @param endpoint - Конечная точка API
     * @param data - Данные для отправки
     * @returns Промис с данными ответа
     */
    async post<T>(endpoint: string, data: any): Promise<T> {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(`Ошибка ${response.status}: ${await response.text()}`);
        }
        return response.json();
    }

    /**
     * Выполняет PUT-запрос
     * @param endpoint - Конечная точка API
     * @param data - Данные для отправки
     * @returns Промис с данными ответа
     */
    async put<T>(endpoint: string, data: any): Promise<T> {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(`Ошибка ${response.status}: ${await response.text()}`);
        }
        return response.json();
    }
}
