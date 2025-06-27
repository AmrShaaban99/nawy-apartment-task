import morgan, { StreamOptions } from 'morgan';
import logger from './logger';

// Create a stream object with a 'write' function that will be used by morgan
const stream: StreamOptions = {
  write: (message: string) => {
    // If the message contains a 4xx or 5xx status, log as error, else as info
    if (/ [5]\d{2} /.test(message)) {
      logger.error(message.trim());
    }else if (/ 4\d{2} /.test(message)) {
      logger.warn(message.trim()); 
    } else {
      logger.info(message.trim());
    }
  },
};

const morganMiddleware = morgan(
  ':method :url :status :res[content-length] - :response-time ms',
  { stream }
);

export default morganMiddleware;
