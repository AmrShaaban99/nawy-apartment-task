import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../errors/http-errors';

export function AllExceptionsFilter(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let status = 500;
  let message = 'Internal server error';
  let error = 'Internal Server Error';

  if (err instanceof HttpError) {
    status = err.status;
    message = err.message;
    error = err.constructor.name.replace('Error', '').replace(/([A-Z])/g, ' $1').trim(); 
  } else if (typeof err.status === 'number') {
    status = err.status;
    message = err.message || error;
  } else if (err.message) {
    message = err.message;
  }

  res.status(status).json({
    statusCode: status,
    message,
    error,
  });
}