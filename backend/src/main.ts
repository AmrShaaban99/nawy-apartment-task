import 'reflect-metadata'; // Required for tsyringe
import express from 'express';
import morganMiddleware from './common/utils/logger/morganMiddleware';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { setupSwagger } from './common/utils/swagger'; // <-- Add this import
import { customRateLimiter } from './common/middleware/rateLimiter';
import { PORT } from './config/config';
import routes from './routes/routes';
import hello from './routes/hello.route'; 
import { AppDataSource } from './modules/dataSource'; 
import { DependencyContainer } from './common/containers/dependency-container';
import cors from 'cors';



async function bootstrap (){
  const app = express();
  // Register DataSource for DI
  await AppDataSource.initialize();
  DependencyContainer.configure(); 

  // Use the logger middleware for all requests
  app.use(morganMiddleware);   

  // Setup Swagger docs
  setupSwagger(app);

  app.use(cors());
  // Apply general rate limiter to all requests
  app.use(customRateLimiter({ windowMs: 60000, max: 20 }));

  // Load routes
  routes(app);


  app.use(AllExceptionsFilter);

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/api`);
  });
}

bootstrap()
