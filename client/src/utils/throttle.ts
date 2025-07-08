export function throttle<Args extends unknown[]>(
  func: (...args: Args) => void,
  wait: number,
): (...args: Args) => void {
  let lastCall = 0;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: Args | null = null;

  return function throttled(...args: Args) {
    const now = Date.now();

    if (now - lastCall >= wait) {
      lastCall = now;
      func(...args);
    } else {
      lastArgs = args;
      if (timeoutId) clearTimeout(timeoutId);

      timeoutId = setTimeout(
        () => {
          lastCall = Date.now();
          if (lastArgs) func(...lastArgs);
          timeoutId = null;
        },
        wait - (now - lastCall),
      );
    }
  };
}
