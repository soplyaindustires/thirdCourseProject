import { readDB, writeDB, HseEvent } from './dbService';

/**
 * Получить все события
 */
export const getAllEvents = (): HseEvent[] => {
  const db = readDB();
  return db.events;
};

/**
 * Получить событие по ID
 * @param eventId - ID события
 */
export const getEventById = (eventId: number): HseEvent | undefined => {
  const db = readDB();
  return db.events.find(e => e.id === eventId);
};

/**
 * Пользователь записывается на событие
 * @param userId - ID пользователя
 * @param eventId - ID события
 */
export const joinEvent = (userId: number, eventId: number): void => {
  const db = readDB();
  const event = db.events.find(e => e.id === eventId);

  if (!event) throw new Error('Событие не найдено');

  if (!event.participants.includes(userId)) {
    event.participants.push(userId);
    writeDB(db);
  }
};

/**
 * Пользователь отписывается от события
 * @param userId - ID пользователя
 * @param eventId - ID события
 */
export const leaveEvent = (userId: number, eventId: number): void => {
  const db = readDB();
  const event = db.events.find(e => e.id === eventId);

  if (!event) throw new Error('Событие не найдено');

  event.participants = event.participants.filter(id => id !== userId);
  writeDB(db);
};