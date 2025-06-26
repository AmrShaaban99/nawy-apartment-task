import express from 'express';
import morganMiddleware from './common/utils/logger/morganMiddleware';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
async function bootstrap (){
  const app = express();

  // Use the logger middleware for all requests
  app.use(morganMiddleware);   

  const PORT = process.env.PORT || 3000;


  // Register the error handler AFTER all routes
  app.use(AllExceptionsFilter);

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

bootstrap()
