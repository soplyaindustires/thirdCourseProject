import { HseEvent } from '../EventsRepository/EventsRepository.interface';

export type User = {
    id: number;
    login: string; // email
    password: string;
    role: 'user' | 'creator';
    registeredEvents: number[]; // Список ID событий, куда записан пользователь.
    createdEvents: number[]; // Список ID событий, которые он создал.
    createdDate: string; // Дата регистрации
    fullName: string;
    educationalProgram: string;
    group: string;
    course: number;
};
/**
 * Репозиторий - штучка для прямого доступа к данным. Т.е. сразу к sql базе данных, или к noSql базе данных
 * или вообще не к базе данных, но к данным.
 */
export interface UserRepository {
    /**
     * Получить пользователя по его ID
     * @param id - Уникальный идентификатор пользователя
     */
    getUserById(id: number): Promise<User>;

    /**
     * Авторизация пользователя
     * @param login - Логин (или email)
     * @param password - Пароль
     */
    authorizeUser(login: string, password: string): Promise<User>;

    /**
     * Регистрация нового пользователя
     * @param login - Логин (или email)
     * @param password - Пароль
     * @param role - Роль пользователя ('user' или 'creator')
     */
    registerUser(
        login: string,
        password: string,
        role: 'user' | 'creator',
        fullName: string,
        educationalProgram: string,
        group: string,
        course: number
    ): Promise<User>;

    /**
     * Получить список всех пользователей (полезно на этапе разработки)
     */
    /* getAllUsers(): Promise<User[]>; */
}
