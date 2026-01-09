import express from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (_req, res) => {
    res.status(200).json({
        success: true,
        message: 'API is running'
    });
});

// after middleware
app.use('/api', routes);

export default app;
