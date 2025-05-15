import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.routes';
import { errorHandler } from './middlewares/error.middleware';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', userRoutes);

app.use('/hello', (req, res) => {
    return res.status(200).json({ message: 'Hello World!' });
});

app.use(errorHandler);

export default app;
