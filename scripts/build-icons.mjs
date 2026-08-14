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

// App Store Connect's marketing icon must be exactly 1024x1024 with no
// alpha channel (fully opaque) — flatten onto the icon's own background.
await sharp(icon, { density: 384 })
  .resize(1024, 1024)
  .flatten({ background: '#b5706a' })
  .png()
  .toFile('icons/ios-app-store-1024.png');
console.log('wrote icons/ios-app-store-1024.png');
