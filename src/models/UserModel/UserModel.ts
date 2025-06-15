import { User, UserRepository } from '../../repositories/UserRepository/UserRepository.interface';

export class UserModel {
    private repository: UserRepository;

    constructor(repository: UserRepository) {
        this.repository = repository;
    }

    /**
     * Получить пользователя по ID
     */
    async getUserById(id: number): Promise<User> {
        return await this.repository.getUserById(id);
    }

    /**
     * Авторизация пользователя
     */
    async authorizeUser(login: string, password: string): Promise<User> {
        return await this.repository.authorizeUser(login, password);
    }

    /**
     * Регистрация нового пользователя
     */
    async registerUser(data: Omit<User, 'id' | 'registeredEvents' | 'createdEvents' | 'createdDate'>): Promise<User> {
        return await this.repository.registerUser(
            data.login,
            data.password,
            data.role,
            data.fullName,
            data.educationalProgram,
            data.group,
            data.course
        );
    }
}
