import app from './app.js';
import http from 'http';
import { envConfig } from './config/config.js';

const server = http.createServer(app);
server.listen(envConfig.PORT, () => {
  console.log(`Server running on port ${envConfig.PORT}`);
});
