import { HseEvent } from '../EventsRepository/EventsRepository.interface';

export type User = {
    id: number;
    login: string;
    password: string;
    role: 'user' | 'creator';
    registeredEvents: number[];
    createdEvents: number[];
};

/**
 * Репозиторий - штучка для прямого доступа к данным. Т.е. сразу к sql базе данных, или к noSql базе данных
 * или вообще не к базе данных, но к данным.
 */
export interface UserRepository {
    /**
     * пык мык
     * @param id
     */
    getUserById(id: number): Promise<User>;
    /**
     * пук как
     * @param login
     * @param password
     */
    authorizeUser(login: string, password: string): Promise<any>;

    registerUser(): Promise<any>;
}
