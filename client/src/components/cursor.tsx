import * as React from 'react';
import { PerfectCursor } from 'perfect-cursors';
import { uuidToColor } from '../utils/uuidToColor';

type CursorProps = {
  point: number[];
  name?: string;
  uuid: string;
};

function usePerfectCursor(cb: (point: number[]) => void, point?: number[]) {
  const [pc] = React.useState(() => new PerfectCursor(cb));

  React.useLayoutEffect(() => {
    if (point) pc.addPoint(point);
    return () => pc.dispose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pc]);

  const onPointChange = React.useCallback((point: number[]) => pc.addPoint(point), [pc]);

  return onPointChange;
}

export function Cursor({ point, name, uuid }: CursorProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const animateCursor = React.useCallback((point: number[]) => {
    if (containerRef.current) {
      containerRef.current.style.transform = `translate(${point[0]}px, ${point[1]}px)`;
    }
  }, []);

  const color = uuidToColor(uuid);
  const onPointMove = usePerfectCursor(animateCursor);

  React.useLayoutEffect(() => {
    onPointMove(point);
  }, [point, onPointMove]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        transform: 'translate(-9999px, -9999px)', // hidden initially
        pointerEvents: 'none',
      }}
    >
      {/* Tooltip above the cursor */}
      {name && (
        <div
          style={{
            position: 'absolute',
            bottom: '100%', // stack above
            left: '50%',
            background: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            fontSize: '12px',
            padding: '0.1rem 0.5rem',
            borderRadius: '4px',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
          }}
        >
          {name}
        </div>
      )}

      {/* SVG cursor */}
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 35,
          height: 35,
          overflow: 'visible',
        }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 35 35"
        fill="none"
        fillRule="evenodd"
      >
        <g fill="rgba(0,0,0,.2)" transform="translate(1,1)">
          <path d="m12 24.4219v-16.015l11.591 11.619h-6.781l-.411.124z" />
          <path d="m21.0845 25.0962-3.605 1.535-4.682-11.089 3.686-1.553z" />
        </g>
        <g fill="white">
          <path d="m12 24.4219v-16.015l11.591 11.619h-6.781l-.411.124z" />
          <path d="m21.0845 25.0962-3.605 1.535-4.682-11.089 3.686-1.553z" />
        </g>
        <g fill={color}>
          <path d="m19.751 24.4155-1.844.774-3.1-7.374 1.841-.775z" />
          <path d="m13 10.814v11.188l2.969-2.866.428-.139h4.768z" />
        </g>
      </svg>
    </div>
  );
  // const rCursor = React.useRef<SVGSVGElement>(null);
  // const rTooltip = React.useRef<HTMLDivElement>(null);

  // const color = uuidToColor(uuid);
  // const CURSOR_WIDTH = 35;
  // const CURSOR_HEIGHT = 35;

  // const animateCursor = React.useCallback((point: number[]) => {
  //   const elm = rCursor.current;
  //   const tip = rTooltip.current;
  //   if (!elm || !tip) return;
  //   console.log(point[0], point[1]);
  //   elm.style.setProperty('transform', `translate(${point[0]}px, ${point[1]}px)`);
  //   tip.style.setProperty('transform', `translate(${point[0] + 10}px, ${point[1] - 20}px)`);
  // }, []);

  // const onPointMove = usePerfectCursor(animateCursor);

  // React.useLayoutEffect(() => {
  //   onPointMove(point);
  // }, [point, onPointMove]);

  // return (
  //   <div
  //     style={{
  //       position: 'relative',
  //     }}
  //   >
  //     <svg
  //       ref={rCursor}
  //       style={{
  //         position: 'absolute',
  //         top: 0,
  //         left: 0,
  //         width: CURSOR_WIDTH,
  //         height: CURSOR_HEIGHT,
  //         overflow: 'visible',
  //       }}
  //       xmlns="http://www.w3.org/2000/svg"
  //       viewBox="0 0 35 35"
  //       fill="none"
  //       fillRule="evenodd"
  //     >
  //       <g fill="rgba(0,0,0,.2)" transform="translate(1,1)">
  //         <path d="m12 24.4219v-16.015l11.591 11.619h-6.781l-.411.124z" />
  //         <path d="m21.0845 25.0962-3.605 1.535-4.682-11.089 3.686-1.553z" />
  //       </g>
  //       <g fill="white">
  //         <path d="m12 24.4219v-16.015l11.591 11.619h-6.781l-.411.124z" />
  //         <path d="m21.0845 25.0962-3.605 1.535-4.682-11.089 3.686-1.553z" />
  //       </g>
  //       <g fill={color}>
  //         <path d="m19.751 24.4155-1.844.774-3.1-7.374 1.841-.775z" />
  //         <path d="m13 10.814v11.188l2.969-2.866.428-.139h4.768z" />
  //       </g>
  //     </svg>

  //     {name && (
  //       <div
  //         ref={rTooltip}
  //         style={{
  //           position: 'absolute',
  //           padding: '2px 6px',
  //           background: 'rgba(0,0,0,0.7)',
  //           color: 'white',
  //           borderRadius: 3,
  //           pointerEvents: 'none',
  //           whiteSpace: 'nowrap',
  //           fontSize: 12,
  //         }}
  //       >
  //         {name}
  //       </div>
  //     )}
  //   </div>
  // );
}
