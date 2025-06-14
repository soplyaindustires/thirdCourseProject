import { Request, Response } from 'express';
import * as userService from '../services/userService';

export const getUserById = (req: Request, res: Response) => {
  const userId = parseInt(req.params.id, 10);
  const user = userService.getUserById(userId);
  if (!user) return res.status(404).send({ error: 'Пользователь не найден' });
  res.send(user);
};

export const registerUser = (req: Request, res: Response) => {
  const {
    login,
    password,
    role,
    fullName,
    educationalProgram,
    group,
    course
  } = req.body;

  // Проверка наличия всех полей
  if (!login || !password || !role || !fullName || !educationalProgram || !group || !course) {
    return res.status(400).send({ error: 'Не все обязательные поля заполнены' });
  }

  const user = userService.registerUser({
    login,
    password,
    role,
    fullName,
    educationalProgram,
    group,
    course
  });

  res.status(201).send(user);
};
export const authorizeUser = (req: Request, res: Response) => {
  const { login, password } = req.body;
  const user = userService.authorizeUser(login, password);
  if (!user) return res.status(401).send({ error: 'Неверные логин или пароль' });
  res.send(user);
};