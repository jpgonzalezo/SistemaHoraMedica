import express, { json } from 'express';
import morgan from 'morgan';
import userRoutes from './routes/user';
import reserveRoutes from './routes/reserve';
const app = express(); //MIDDLEWARES

app.use(morgan('dev'));
app.use(json()); //ROUTES

app.use('/api/users', userRoutes);
app.use('/api/reserves', reserveRoutes);
export default app;