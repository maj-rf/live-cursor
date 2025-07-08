import { useEffect, useRef } from 'react';
import useWebSocket from 'react-use-websocket';
import { throttle } from '../utils/throttle';
import { Cursor } from './cursor';

interface Position {
  x: number;
  y: number;
}

interface CursorState {
  username: string;
  state: Position;
}

function renderCursors(users: Record<string, CursorState>) {
  if (!users) return null;
  return Object.keys(users).map((uuid) => {
    const user = users[uuid];
    return (
      <Cursor key={uuid} point={[user.state.x, user.state.y]} name={user.username} uuid={uuid} />
    );
  });
}

export function Home({ username }: { username: string }) {
  const WS_URL = import.meta.env.VITE_WS_URL;
  const { sendJsonMessage, lastJsonMessage } = useWebSocket(WS_URL, {
    queryParams: {
      username,
    },
  });

  const throttledSend = useRef(throttle(sendJsonMessage, 50));

  useEffect(() => {
    sendJsonMessage({
      x: 0,
      y: 0,
    });
    window.addEventListener('mousemove', (e) => {
      throttledSend.current({
        x: e.clientX,
        y: e.clientY,
      });
    });
  }, [throttledSend, sendJsonMessage]);

  if (lastJsonMessage) return <>{renderCursors(lastJsonMessage as Record<string, CursorState>)}</>;
}
