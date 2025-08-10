export function rand<T>(like: Iterable<T> | ArrayLike<T>) {
  const array = Array.from(like);
  return array[Math.random() * array.length | 0];
}

export function randInt(min: number, max: number) {
  return Math.random() * (max - min) + min | 0;
}