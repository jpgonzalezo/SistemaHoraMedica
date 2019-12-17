import express, {json} from 'express';
import cors from 'cors';
import morgan from 'morgan';
import userRoutes from './routes/user';
import reserveRoutes from './routes/reserve';
import loginRoutes from './routes/login';

const app = express();
//MIDDLEWARES
app.use(morgan('dev'));
app.use(json());
app.use(cors());
//ROUTES
app.use('/api/users',userRoutes);
app.use('/api/reserves',reserveRoutes);
app.use('/api/login', loginRoutes);
export default app;