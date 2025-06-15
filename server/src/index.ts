import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
//@ts-ignore
import userRouter from './routes/userRoutes';
import eventRouter from './routes/eventRoutes';

const app = express();

// Настройки middleware
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));

// Роуты
app.use('/api/users', userRouter);
app.use('/api/events', eventRouter);

// Порт
const PORT = process.env.PORT || 3000;

// Запуск сервера
app.listen(PORT, () => {
    console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
});
