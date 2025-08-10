type Frame = (deltaTime: number, currentTime: number) => any;

export function looper(frame: Frame) {
  let raf = requestAnimationFrame(onFrame);
  let currentTime = performance.now();

  function onFrame(now: number) {
    raf = requestAnimationFrame(onFrame);
    frame(now - currentTime, currentTime = now);
  }

  return () => {
    cancelAnimationFrame(raf);
  };
}