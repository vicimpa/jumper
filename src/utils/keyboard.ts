const KEYS = new Set<string>();
const CHECK = new Set<string>();

export function isDown(code: string) {
  return KEYS.has(code);
}

export function isUp(code: string) {
  return !KEYS.has(code);
}

export function isPress(code: string) {
  if (KEYS.has(code)) {
    Promise.resolve()
      .then(() => CHECK.add(code));
    return !CHECK.has(code);
  }

  CHECK.delete(code);
  return false;
}

addEventListener('keydown', ({ code }) => {
  KEYS.add(code);
});

addEventListener('keyup', ({ code }) => {
  KEYS.delete(code);
});

addEventListener('blur', () => {
  KEYS.clear();
  CHECK.clear();
});