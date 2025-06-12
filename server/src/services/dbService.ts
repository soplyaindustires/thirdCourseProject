import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(__dirname, '../data/db.json');

export type DbData = {
  users: User[];
  events: HseEvent[];
};

export type User = {
  id: number;
  login: string;
  password: string;
  role: 'user' | 'creator';
  registeredEvents: number[];
  createdEvents: number[];
  createdDate: string;
};

export type HseEvent = {
  id: number;
  title: string;
  description: string;
  start: string;
  end: string;
  place: string;
  creatorId: number;
  participants: number[];
};

export const readDB = (): DbData => {
  const data = fs.readFileSync(DB_PATH, 'utf-8');
  return JSON.parse(data);
};

export const writeDB = (data: DbData) => {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
};