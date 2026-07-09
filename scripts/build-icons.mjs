import sharp from 'sharp';
import { readFileSync } from 'node:fs';

const icon = readFileSync(new URL('../icons/icon.svg', import.meta.url));
const maskable = readFileSync(new URL('../icons/icon-maskable.svg', import.meta.url));

const jobs = [
  [icon, 192, 'icons/icon-192.png'],
  [icon, 512, 'icons/icon-512.png'],
  [icon, 180, 'icons/apple-touch-icon.png'],
  [maskable, 512, 'icons/icon-512-maskable.png'],
];

for (const [svg, size, out] of jobs) {
  await sharp(svg, { density: 384 }).resize(size, size).png().toFile(out);
  console.log('wrote', out);
}
