import express from 'express';
import cors from 'cors';
import routes from './routes';
import { errorHandler } from './middleware/error.middleware';
import { requestLogger } from './middleware/logger.middleware';


const app = express();

// Middleware
app.use(cors());
app.use(express.json());
// logger
app.use(requestLogger);

// Routes
app.get('/', (_req, res) => {
    res.status(200).json({
        success: true,
        message: 'API is running'
    });
});

// after middleware
app.use('/api', routes);

// error middleware
app.use(errorHandler);

export default app;
