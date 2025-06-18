import { User, UserRepository } from '../UserRepository.interface';
import { ApiClient } from '../../../utils/apiClient/apiClient';

/**
 * Репозиторий пользователей, взаимодействующий с сервером через API
 */
export class SQLUserRepository implements UserRepository {
    private apiClient: ApiClient;

    /**
     * Создает экземпляр SQLUserRepository
     */
    constructor() {
        this.apiClient = new ApiClient('http://localhost:3000/api/users');
    }

    /**
     * Получает пользователя по ID
     * @param id - ID пользователя
     * @returns Промис с данными пользователя
     * @throws Ошибка, если пользователь не найден
     */
    async getUserById(id: number): Promise<User> {
        return this.apiClient.get<User>(`/${id}`);
    }

    /**
     * Авторизует пользователя по логину и паролю
     * @param login - Логин пользователя
     * @param password - Пароль пользователя
     * @returns Промис с данными пользователя
     * @throws Ошибка, если логин или пароль неверны
     */
    async authorizeUser(login: string, password: string): Promise<User> {
        return this.apiClient.post<User>('/authorize', { login, password });
    }

    /**
     * Регистрирует нового пользователя
     * @param login - Логин пользователя
     * @param password - Пароль пользователя
     * @param role - Роль пользователя ('user' или 'creator')
     * @param fullName - Полное имя пользователя
     * @param educationalProgram - Образовательная программа
     * @param group - Группа пользователя
     * @param course - Курс пользователя
     * @returns Промис с данными созданного пользователя
     * @throws Ошибка, если пользователь с таким логином уже существует
     */
    async registerUser(
        login: string,
        password: string,
        role: 'user' | 'creator',
        fullName: string,
        educationalProgram: string,
        group: string,
        course: number
    ): Promise<User> {
        const userData = {
            login,
            password,
            role,
            fullName,
            educationalProgram,
            group,
            course,
        };
        return this.apiClient.post<User>('/', userData);
    }

    /**
     * Добавляет нового пользователя
     * @param userData - Данные пользователя без id и created_date
     * @returns Промис с данными созданного пользователя
     * @throws Ошибка, если пользователь с таким логином уже существует
     */
    async addUser(userData: Omit<User, 'id' | 'created_date'>): Promise<User> {
        return this.apiClient.post<User>('/', userData);
    }

    /**
     * Обновляет данные пользователя
     * @param id - ID пользователя
     * @param userData - Частичные данные пользователя для обновления
     * @returns Промис с обновленными данными пользователя
     * @throws Ошибка, если пользователь не найден
     */
    async upgradeUser(id: number, userData: Partial<Omit<User, 'id' | 'created_date'>>): Promise<User> {
        return this.apiClient.put<User>(`/${id}`, userData);
    }
}
