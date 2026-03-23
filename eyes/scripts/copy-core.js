import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const coreDist = path.resolve(__dirname, '../../../core/dist');
const dest = path.resolve(__dirname, '../public/core-dist');

if (!fs.existsSync(dest)) {
  fs.mkdirSync(dest, { recursive: true });
}

if (fs.existsSync(coreDist)) {
  fs.cpSync(coreDist, dest, { recursive: true });
  console.log('Copied core/dist to public/core-dist');
} else {
  console.error('core/dist not found. Run "npm run build" in core first.');
  process.exit(1);
}
