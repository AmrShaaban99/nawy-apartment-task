import express from 'express';
import morganMiddleware from './common/utils/logger/morganMiddleware';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { setupSwagger } from './common/utils/swagger'; // <-- Add this import
import { customRateLimiter } from './common/middleware/rateLimiter';
import { PORT } from './config/config';
import routes from './routes/routes';

async function bootstrap (){
  const app = express();

  // Use the logger middleware for all requests
  app.use(morganMiddleware);   

  // Setup Swagger docs
  setupSwagger(app);


  // Apply general rate limiter to all requests
  app.use(customRateLimiter({ windowMs: 60000, max: 20 }));

  // Load routes
  routes(app);


  app.use(AllExceptionsFilter);

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
  });
}

bootstrap()
