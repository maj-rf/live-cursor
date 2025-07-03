import { type CorsOptions } from 'cors';

export const envConfig = {
  PORT: Number(process.env.PORT) || 3003,
  CLIENT_URL: process.env.CLIENT_URL || 'your_client_url',
};

const ALLOWED_ORIGINS = [`http://localhost:5178`, envConfig.CLIENT_URL];

export const corsOptions: CorsOptions = {
  origin: ALLOWED_ORIGINS,
  credentials: true,
};
