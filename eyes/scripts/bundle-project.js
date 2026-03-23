import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DEMO_APP_DIR = path.resolve(__dirname, '../../../apps/demo-app');
const OUTPUT_FILE = path.resolve(__dirname, '../src/files.ts');

function readDirRecursive(dir) {
  const result = {};
  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    if (item.name === 'node_modules' || item.name === '.DS_Store' || item.name === 'dist') continue;

    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      result[item.name] = {
        directory: readDirRecursive(fullPath)
      };
    } else {
      const contents = fs.readFileSync(fullPath, 'utf-8');
      result[item.name] = {
        file: {
          contents
        }
      };
    }
  }
  return result;
}

const tree = readDirRecursive(DEMO_APP_DIR);

// Fix package.json for WebContainer environment
// The local path "file:../../core" doesn't exist in WebContainer.
// We mount core at "/libs/core", so we must update the path.
if (tree['package.json'] && tree['package.json'].file) {
  try {
    const pkg = JSON.parse(tree['package.json'].file.contents);
    if (pkg.dependencies && pkg.dependencies['@agent-k/core']) {
      pkg.dependencies['@agent-k/core'] = 'file:./libs/core';
      console.log('Rewrote @agent-k/core dependency to file:./libs/core');
    }
    tree['package.json'].file.contents = JSON.stringify(pkg, null, 2);
  } catch (e) {
    console.error('Failed to patch package.json:', e);
  }
}

// Add .npmrc manually if missing (it's often gitignored or hidden)
if (!tree['.npmrc']) {
  tree['.npmrc'] = {
    file: {
      contents: 'registry=https://registry.npmmirror.com/'
    }
  };
}

const fileContent = `import { FileSystemTree } from '@webcontainer/api';

export const todoAppFiles: FileSystemTree = ${JSON.stringify(tree, null, 2)};
`;

fs.writeFileSync(OUTPUT_FILE, fileContent);
console.log(`Generated ${OUTPUT_FILE} from ${DEMO_APP_DIR}`);
