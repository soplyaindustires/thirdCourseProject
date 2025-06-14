import fs from 'fs';
import path from 'path';

// Путь к моковой "базе"
const DB_PATH = path.join(__dirname, '../data/db.json');

/**
 * Интерфейс пользователя
 */
export type User = {
  id: number;
  login: string; // email или логин
  password: string;
  role: 'user' | 'creator'; // роль в системе
  registeredEvents: number[]; // ID событий, куда записан
  createdEvents: number[]; // ID событий, которые он создал
  createdDate: string; // дата регистрации в ISO 8601

  fullName: string; // полное имя пользователя
  educationalProgram: string; // образовательная программа
  group: string; // номер группы
  course: number; // курс обучения
};

/**
 * Тип события
 */
export type HseEvent = {
  id: number;
  title: string; // название мероприятия
  description: string; // описание
  start: string; // дата начала (ISO)
  end: string; // дата окончания (ISO)
  place: string; // место проведения
  creatorId: number; // ID создателя
  participants: number[]; // ID участников
  infoURL: string | null; // ссылка на подробности
  registrationURL: string | null; // ссылка на регистрацию
};

/**
 * Структура БД (моковая)
 */
export type DbData = {
  users: User[];
  events: HseEvent[];
};

/**
 * Чтение данных из "БД" (файла)
 */
export const readDB = (): DbData => {
  const data = fs.readFileSync(DB_PATH, 'utf-8');
  return JSON.parse(data);
};

/**
 * Запись обновлённых данных обратно в файл
 * @param data - обновлённые данные
 */
export const writeDB = (data: DbData) => {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
};