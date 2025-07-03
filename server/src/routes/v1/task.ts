import express, { type Router, type Request, type Response } from 'express';
import createHttpError from 'http-errors';

export const tasks: Router = express.Router();

tasks.get('/', (_req: Request, res: Response) => {
  const list = [
    { name: 'Go to Grocery', id: 1 },
    { name: 'Read Intro to Biology', id: 2 },
  ];
  res.json(list);
});

tasks.get('/test', (_req: Request, _res: Response, _next) => {
  throw createHttpError(401, 'Unauth');
});
