import { readDB, writeDB, HseEvent, User } from './dbService';

export const getAllEvents = (): HseEvent[] => {
  const db = readDB();
  return db.events;
};

export const getEventById = (eventId: number): HseEvent | undefined => {
  const db = readDB();
  return db.events.find(e => e.id === eventId);
};

export const joinEvent = (userId: number, eventId: number): void => {
  const db = readDB();
  const event = db.events.find(e => e.id === eventId);

  if (!event) throw new Error('Событие не найдено');
  if (!event.participants.includes(userId)) {
    event.participants.push(userId);
    writeDB(db);
  }
};

export const leaveEvent = (userId: number, eventId: number): void => {
  const db = readDB();
  const event = db.events.find(e => e.id === eventId);

  if (!event) throw new Error('Событие не найдено');
  event.participants = event.participants.filter(id => id !== userId);
  writeDB(db);
};