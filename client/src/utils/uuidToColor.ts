function hashCode(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to a 32-bit integer
  }
  return hash;
}

function intToRGB(i: number) {
  const red = (i >> 16) & 0xff;
  const green = (i >> 8) & 0xff;
  const blue = i & 0xff;
  return `rgb(${red},${green},${blue})`;
}

export function uuidToColor(uuid: string) {
  const hash = hashCode(uuid);
  return intToRGB(hash);
}
