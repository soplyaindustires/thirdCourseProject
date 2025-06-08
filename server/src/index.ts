import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import userRouter from './routes/userRoutes';
import eventRouter from './routes/eventRoutes';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/api/users', userRouter);
app.use('/api/events', eventRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
});