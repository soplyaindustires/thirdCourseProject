import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
//@ts-ignore
import userRouter from './routers/userRouter';
import eventRouter from './routers/eventRouter';

const app = express();

// Настройки middleware
app.use(cors());
app.use(bodyParser.json());

// Роуты
app.use('/api/users', userRouter);
app.use('/api/events', eventRouter);

// Порт
const PORT = process.env.PORT || 3000;

// Запуск сервера
app.listen(PORT, () => {
    console.log(`сервер запущен на http://localhost:${PORT}`);
});
