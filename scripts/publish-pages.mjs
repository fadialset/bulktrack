import { cpSync, existsSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const docs = join(root, 'docs');

if (!existsSync(join(dist, 'index.html'))) {
  throw new Error('dist/index.html missing — vite build did not finish');
}

writeFileSync(join(dist, '.nojekyll'), '');
writeFileSync(join(dist, '404.html'), readFileSync(join(dist, 'index.html')));

rmSync(docs, { recursive: true, force: true });
cpSync(dist, docs, { recursive: true });
writeFileSync(join(root, '.nojekyll'), '');

console.log('Published dist to docs/ for GitHub Pages');
