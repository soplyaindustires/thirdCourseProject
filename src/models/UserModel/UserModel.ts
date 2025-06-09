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
	async registerUser(login: string, password: string, role: 'user' | 'creator'): Promise<User> {
		return await this.repository.registerUser(login, password, role);
	}	
	
}
