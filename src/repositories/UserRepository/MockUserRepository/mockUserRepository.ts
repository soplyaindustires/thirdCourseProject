import { User, UserRepository } from '../UserRepository.interface';
import { mockUsersData } from '../MockUserRepository/mockUserData';

export class MockUserRepository implements UserRepository {
  private users = [...mockUsersData]; // делаем копию моковых данных

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

  async registerUser(data: Omit<User, 'id' | 'registeredEvents' | 'createdEvents' | 'createdDate'>): Promise<User> {
  const newUser = {
    id: Date.now(),
    ...data,
    registeredEvents: [],
    createdEvents: [],
    createdDate: new Date().toISOString()
  };

  this.users.push(newUser);
  return newUser;
}
}