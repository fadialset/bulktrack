import { deflateSync, crc32 } from 'node:zlib';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'public', 'icons');
mkdirSync(outDir, { recursive: true });

function chunk(type, data) {
  const tag = Buffer.from(type);
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([tag, data])) >>> 0);
  return Buffer.concat([len, tag, data, crc]);
}

function writePng(path, size, pixel) {
  const raw = Buffer.alloc((size * 4 + 1) * size);
  for (let y = 0; y < size; y++) {
    const row = y * (size * 4 + 1);
    raw[row] = 0;
    for (let x = 0; x < size; x++) {
      const [r, g, b, a] = pixel(x, y, size);
      const i = row + 1 + x * 4;
      raw[i] = r;
      raw[i + 1] = g;
      raw[i + 2] = b;
      raw[i + 3] = a;
    }
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  writeFileSync(
    path,
    Buffer.concat([
      Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
      chunk('IHDR', ihdr),
      chunk('IDAT', deflateSync(raw, { level: 9 })),
      chunk('IEND', Buffer.alloc(0)),
    ]),
  );
}

function mix(t, a, b) {
  return Math.round(a + (b - a) * t);
}

function iconPixel(x, y, size, maskable) {
  const nx = (x + 0.5) / size - 0.5;
  const ny = (y + 0.5) / size - 0.5;
  const r = Math.hypot(nx, ny);
  const ring = maskable ? 0.28 : 0.34;
  const thickness = maskable ? 0.055 : 0.07;
  const bg = [2, 6, 23, 255];
  const navy = [15, 23, 42, 255];
  const blue = [22, 135, 255, 255];
  const white = [248, 250, 252, 255];

  const corner = maskable ? 0.5 : 0.22;
  const max = 0.5 - 0.02;
  const ax = Math.abs(nx);
  const ay = Math.abs(ny);
  const outside =
    ax > max ||
    ay > max ||
    (ax > max - corner && ay > max - corner && Math.hypot(ax - (max - corner), ay - (max - corner)) > corner);
  if (outside) return [0, 0, 0, maskable ? 255 : 0];

  let px = navy;
  if (r < ring + thickness && r > ring - thickness) px = blue;
  if (r < 0.11) px = white;
  if (r < 0.055) px = blue;

  const glow = Math.max(0, 1 - r / 0.5);
  px = [mix(0.08 * glow, px[0], blue[0]), mix(0.08 * glow, px[1], blue[1]), mix(0.08 * glow, px[2], blue[2]), 255];
  if (maskable && r > 0.46) px = bg;
  return px;
}

writePng(join(outDir, 'icon-192.png'), 192, (x, y, s) => iconPixel(x, y, s, false));
writePng(join(outDir, 'icon-512.png'), 512, (x, y, s) => iconPixel(x, y, s, false));
writePng(join(outDir, 'icon-512-maskable.png'), 512, (x, y, s) => iconPixel(x, y, s, true));
writePng(join(outDir, 'apple-touch-icon.png'), 180, (x, y, s) => iconPixel(x, y, s, true));

console.log('Wrote PWA icons to public/icons');
