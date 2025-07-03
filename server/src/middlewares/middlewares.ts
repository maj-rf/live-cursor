import { type Request, type Response, type NextFunction } from 'express';
import createHttpError, { isHttpError } from 'http-errors';

export const errorHandler = (error: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if (process.env.NODE_ENV !== 'production') {
    console.error(error);
  }
  let errorMessage = 'An unknown error has occurred';
  let status = 500;
  if (isHttpError(error)) {
    status = error.status;
    errorMessage = error.message;
  }
  res.status(status).json({ error: errorMessage });
};

export const unknownEndpoint = (req: Request, _res: Response, next: NextFunction) => {
  next(createHttpError(404, `Not Found - ${req.originalUrl}`));
};
