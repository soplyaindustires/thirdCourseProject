import { Request, Response } from 'express';
import * as userService from '../services/userService';

export const getUserById = (req: Request, res: Response) => {
  const userId = parseInt(req.params.id, 10);
  const user = userService.getUserById(userId);
  if (!user) return res.status(404).send({ error: 'Пользователь не найден' });
  res.send(user);
};