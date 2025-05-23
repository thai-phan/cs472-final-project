import express, {ErrorRequestHandler} from 'express';
import cors from 'cors';
import productRoutes from './routes/product.routes';
import swaggerUi from  'swagger-ui-express';
import swaggerJSDoc  from 'swagger-jsdoc';
import swaggerOptions from './swaggerOptions';

const app = express();
const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(cors());
app.use(express.json());


app.use('/products', productRoutes);


app.use((req, res, next) => {
    res.status(404).json({ error: req.url + ' API not supported!' });
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if (err.message === 'Missing required fields') {
        res.status(400).json({ error: err.message });
    }
    if (err.message === 'NOT Found') {
        res.status(404).json({ error: err.message });
    } else {
        res.status(500).json({ error: 'Something is wrong! Try later' });
    }
}

app.use(errorHandler);

export default app;
