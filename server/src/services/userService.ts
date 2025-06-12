import { readDB, writeDB, User } from './dbService';

export const getUserById = (userId: number): User | undefined => {
  const db = readDB();
  return db.users.find(u => u.id === userId);
};

export const registerUser = (userData: Omit<User, 'id' | 'registeredEvents' | 'createdEvents' | 'createdAt'>): User => {
  const db = readDB();
  const newUser: User = {
    ...userData,
    id: Date.now(),
    registeredEvents: [],
    createdEvents: [],
    createdDate: new Date().toISOString()
  };
  db.users.push(newUser);
  writeDB(db);
  return newUser;
};

export const authorizeUser = (login: string, password: string): User | undefined => {
  const db = readDB();
  return db.users.find(u => u.login === login && u.password === password);
};