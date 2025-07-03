import express, { type Request, type Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { errorHandler, unknownEndpoint } from './middlewares/middlewares.js';
import { corsOptions } from './config/config.js';
import { v1 } from './routes/v1/index.js';

const app = express();
app
  .disable('x-powered-by')
  .use(express.urlencoded({ extended: true }))
  .use(express.json())
  .use(morgan('dev'))
  .use(cors(corsOptions));

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello, world!');
});

app.use('/v1', v1);

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
