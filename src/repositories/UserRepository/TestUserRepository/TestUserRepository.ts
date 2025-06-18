import { User, UserRepository } from '../UserRepository.interface';
import { data } from './helpers';

export class TestUserRepository implements UserRepository {
    private users = [...data];

    async getUserById(id: number): Promise<User> {
        const user = this.users.find(u => u.id === id);
        if (!user) throw new Error(`Пользователь с ID=${id} не найден`);
        return user;
    }

    async authorizeUser(login: string, password: string): Promise<User> {
        const user = this.users.find(u => u.login === login && u.password === password);
        if (!user) throw new Error('Неверный логин или пароль');
        return user;
    }

    async registerUser(
        login: string,
        password: string,
        role: 'user' | 'creator',
        fullName: string,
        educationalProgram: string,
        group: string,
        course: number
    ): Promise<User> {
        const newUser = {
            id: Date.now(),
            login,
            password,
            role,
            registeredEvents: [],
            createdEvents: [],
            createdDate: new Date().toISOString(),
            fullName,
            educationalProgram,
            group,
            course,
        };
        this.users.push(newUser);
        return newUser;
    }
}
