import { UserRepository } from '../../repositories/UserRepository/UserRepository.interface';

export class UserModel {
    private repository: UserRepository;

    constructor(repository: UserRepository) {
        this.repository = repository;
    }

    async getUserData(login: string) {
        const data = await this.repository.getUserById(12);
        return data;
    }
}
