import { readDB, writeDB, User } from './dbService';

/**
 * Получить пользователя по ID
 * @param userId - числовой идентификатор пользователя
 * @returns Найденный пользователь или undefined
 */
export const getUserById = (userId: number): User | undefined => {
  const db = readDB();
  return db.users.find(u => u.id === userId);
};

/**
 * Зарегистрировать нового пользователя
 * @param userData - данные о пользователе без id и даты создания
 * @returns Созданный пользователь с уникальным id и датой регистрации
 */
export const registerUser = (userData: Omit<User, 'id' | 'registeredEvents' | 'createdEvents' | 'createdDate'>): User => {
  const db = readDB();

  // Создаём нового пользователя с дефолтными значениями
  const newUser: User = {
    ...userData,
    id: Date.now(), // временный ID, позже заменится на настоящий из БД
    registeredEvents: [],
    createdEvents: [],
    createdDate: new Date().toISOString()
  };

  db.users.push(newUser);
  writeDB(db);

  return newUser;
};

/**
 * Авторизация пользователя
 * @param login - логин (email)
 * @param password - пароль
 * @returns Пользователь, если найден, иначе undefined
 */
export const authorizeUser = (login: string, password: string): User | undefined => {
  const db = readDB();
  return db.users.find(u => u.login === login && u.password === password);
};