import { deflateSync, crc32 } from 'node:zlib';
import { mkdirSync, writeFileSync, statSync, readFileSync, unlinkSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'public', 'exercise-images');
mkdirSync(outDir, { recursive: true });

const WIDTH = 960;
const HEIGHT = 540;

function chunk(type, data) {
  const tag = Buffer.from(type);
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([tag, data])) >>> 0);
  return Buffer.concat([len, tag, data, crc]);
}

function writePng(path, pixel) {
  const raw = Buffer.alloc((WIDTH * 4 + 1) * HEIGHT);
  for (let y = 0; y < HEIGHT; y++) {
    const row = y * (WIDTH * 4 + 1);
    raw[row] = 0;
    for (let x = 0; x < WIDTH; x++) {
      const [r, g, b, a] = pixel(x, y);
      const i = row + 1 + x * 4;
      raw[i] = r;
      raw[i + 1] = g;
      raw[i + 2] = b;
      raw[i + 3] = a;
    }
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(WIDTH, 0);
  ihdr.writeUInt32BE(HEIGHT, 4);
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

function rect(x, y, rx, ry, rw, rh) {
  return x >= rx && x < rx + rw && y >= ry && y < ry + rh;
}

function machinePixel(kind, x, y) {
  const nx = x / WIDTH;
  const ny = y / HEIGHT;
  const bg = [16, 19, 24];
  const panel = [32, 37, 45];
  const metal = [90, 98, 110];
  const accent = [165, 255, 63];
  const pad = [42, 48, 58];
  let px = [
    mix(ny * 0.15, bg[0], 8),
    mix(ny * 0.15, bg[1], 10),
    mix(ny * 0.15, bg[2], 12),
    255,
  ];

  const frame = rect(x, y, 90, 70, 780, 400);
  if (frame) px = [panel[0], panel[1], panel[2], 255];

  if (kind === 'chest_press' || kind === 'incline_chest_press') {
    if (rect(x, y, 280, 150, 400, 220)) px = [pad[0], pad[1], pad[2], 255];
    if (rect(x, y, 180, 200, 70, 28) || rect(x, y, 710, 200, 70, 28)) px = [metal[0], metal[1], metal[2], 255];
    if (kind === 'incline_chest_press' && rect(x, y, 300, 120, 360, 40)) px = [accent[0], accent[1], accent[2], 255];
  } else if (kind === 'lat_pulldown') {
    if (rect(x, y, 460, 90, 40, 320)) px = [metal[0], metal[1], metal[2], 255];
    if (rect(x, y, 300, 90, 360, 24)) px = [accent[0], accent[1], accent[2], 255];
    if (rect(x, y, 340, 320, 280, 90)) px = [pad[0], pad[1], pad[2], 255];
  } else if (kind === 'seated_row') {
    if (rect(x, y, 220, 210, 520, 140)) px = [pad[0], pad[1], pad[2], 255];
    if (rect(x, y, 200, 250, 80, 24) || rect(x, y, 680, 250, 80, 24)) px = [metal[0], metal[1], metal[2], 255];
  } else if (kind === 'shoulder_press') {
    if (rect(x, y, 320, 180, 320, 200)) px = [pad[0], pad[1], pad[2], 255];
    if (rect(x, y, 250, 140, 50, 50) || rect(x, y, 660, 140, 50, 50)) px = [metal[0], metal[1], metal[2], 255];
  } else if (kind === 'leg_press') {
    if (rect(x, y, 180, 160, 600, 240)) px = [pad[0], pad[1], pad[2], 255];
    if (rect(x, y, 260, 120, 440, 50)) px = [metal[0], metal[1], metal[2], 255];
  } else if (kind === 'biceps_curl') {
    if (rect(x, y, 300, 220, 360, 140)) px = [pad[0], pad[1], pad[2], 255];
    if (rect(x, y, 330, 180, 300, 30)) px = [metal[0], metal[1], metal[2], 255];
  } else if (kind === 'triceps_pushdown') {
    if (rect(x, y, 470, 90, 24, 300)) px = [metal[0], metal[1], metal[2], 255];
    if (rect(x, y, 430, 90, 100, 18)) px = [accent[0], accent[1], accent[2], 255];
    if (rect(x, y, 440, 360, 80, 18)) px = [metal[0], metal[1], metal[2], 255];
  } else if (kind === 'rear_delt') {
    if (rect(x, y, 360, 150, 240, 240)) px = [pad[0], pad[1], pad[2], 255];
    if (rect(x, y, 220, 210, 80, 24) || rect(x, y, 660, 210, 80, 24)) px = [metal[0], metal[1], metal[2], 255];
  } else if (kind === 'leg_extension' || kind === 'leg_curl') {
    if (rect(x, y, 280, 180, 400, 180)) px = [pad[0], pad[1], pad[2], 255];
    if (rect(x, y, 500, 330, 220, 28)) px = [metal[0], metal[1], metal[2], 255];
    if (kind === 'leg_curl' && rect(x, y, 300, 150, 360, 24)) px = [accent[0], accent[1], accent[2], 255];
  }

  if (nx > 0.86 && ny > 0.82 && nx < 0.96 && ny < 0.9) px = [accent[0], accent[1], accent[2], 255];
  return px;
}

const machines = [
  'chest_press',
  'incline_chest_press',
  'lat_pulldown',
  'seated_row',
  'shoulder_press',
  'leg_press',
  'biceps_curl',
  'triceps_pushdown',
  'rear_delt',
  'leg_extension',
  'leg_curl',
];

for (const id of machines) {
  const slug = id.replace(/_/g, '-');
  const pngPath = join(outDir, `${slug}.png`);
  writePng(pngPath, (x, y) => machinePixel(id, x, y));
  const webpPath = join(outDir, `${slug}.webp`);
  try {
    execFileSync('sips', ['-s', 'format', 'jpeg', pngPath, '--out', join(outDir, `${slug}.jpg`)], { stdio: 'ignore' });
  } catch {
    /* jpeg is optional */
  }
  try {
    execFileSync('sips', ['-s', 'format', 'webp', pngPath, '--out', webpPath], { stdio: 'ignore' });
    if (statSync(webpPath).size < 100) throw new Error('empty');
    const header = readFileSync(webpPath).subarray(8, 12).toString();
    if (header !== 'WEBP') throw new Error('not webp');
  } catch {
    try { unlinkSync(webpPath); } catch { /* ignore */ }
  }
}

console.log('Wrote exercise images to public/exercise-images');
