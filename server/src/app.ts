import express from 'express';
import cors from 'cors';
import productRoutes from './routes/product.routes';
import swaggerUi from  'swagger-ui-express';
import swaggerJSDoc  from 'swagger-jsdoc';
import swaggerOptions from './swaggerOptions';

import { errorHandler } from './middlewares/error.middleware';

const app = express();
const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(cors());
app.use(express.json());


app.use('/products', productRoutes);


app.use('/hello', (req, res) => {
    return res.status(200).json({ message: 'Hello World!' });
});

app.use(errorHandler);

export default app;
