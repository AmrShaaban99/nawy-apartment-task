import express from 'express';
import morganMiddleware from './common/utils/logger/morganMiddleware';


async function bootstrap (){
  const app = express();

  // Use the logger middleware for all requests
  app.use(morganMiddleware);   

  
  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

bootstrap()
