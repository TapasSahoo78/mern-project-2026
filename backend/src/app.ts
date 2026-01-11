import express from 'express';
import cors from 'cors';
import passport from 'passport';

import routes from './routes';
import { errorHandler } from './middleware/error.middleware';
import { requestLogger } from './middleware/logger.middleware';

import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';

/* IMPORT STRATEGIES FIRST (TOP LEVEL) */
import './config/passport.google';
import './config/passport.facebook';

const app = express();

// ===== MIDDLEWARE =====
app.use(cors());
app.use(express.json());
app.use(requestLogger);

/* 🔥 PASSPORT MUST BE INITIALIZED BEFORE ROUTES */
app.use(passport.initialize());

// ===== HEALTH CHECK =====
app.get('/', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is running',
  });
});

// ===== ROUTES =====
app.use('/api', routes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ===== ERROR HANDLER =====
app.use(errorHandler);

export default app;
