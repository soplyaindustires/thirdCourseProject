import { User, UserRepository } from '../UserRepository.interface';

class MockUserRepository implements UserRepository {
    async getUserById(id: number): Promise<User> {}
}
