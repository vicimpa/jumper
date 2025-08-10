export function image(src: string) {
  const out = new Image();
  out.src = src;
  return out;
}