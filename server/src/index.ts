import app from './app.js';
import http from 'http';
import { envConfig } from './config/config.js';
import { WebSocketServer, type WebSocket } from 'ws';
import url from 'node:url';
import crypto from 'node:crypto';
const server = http.createServer(app);
const ws = new WebSocketServer({ server });

interface Position {
  x: number;
  y: number;
}
interface CursorState {
  username: string;
  state: Position;
}

const connections = new Map<string, WebSocket>();
const users = new Map<string, CursorState>();

function broadcast() {
  for (const [k] of connections) {
    const connection = connections.get(k);
    const message = JSON.stringify(Object.fromEntries(users));
    console.log(message);
    if (connection) connection.send(message);
  }
}

function handleMessage(bytes: WebSocket.RawData, uuid: crypto.UUID) {
  // message = {"x": 0, "y": 100}
  const message: Position = JSON.parse(bytes.toString());
  const currentUser = users.get(uuid);
  if (currentUser) {
    currentUser.state = message;
    broadcast();
    console.log(`${currentUser.username} updated their state: ${currentUser.state}`);
  }
}

function handleClose(uuid: crypto.UUID) {
  console.log(`${users.get(uuid)?.username} disconnected`);
  connections.delete(uuid);
  users.delete(uuid);
  broadcast();
}

ws.on('connection', (connection, request) => {
  const { username } = url.parse(request.url as string, true).query;
  const uuid = crypto.randomUUID();
  connections.set(uuid, connection);
  users.set(uuid, { username: username as string, state: { x: 0, y: 0 } });

  // listens on update
  connection.on('message', (message) => handleMessage(message, uuid));

  // listens on close
  connection.on('close', () => handleClose(uuid));
});

server.listen(envConfig.PORT, () => {
  console.log(`Server running on port ${envConfig.PORT}`);
});
