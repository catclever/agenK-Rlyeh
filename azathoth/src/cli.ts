#!/usr/bin/env node
import { Command } from 'commander';
import fs from 'fs';
import path from 'path';

const program = new Command();

program
  .name('azathoth')
  .description('Agent K Atom Manager & CLI')
  .version('1.0.0');

program
  .command('molt')
  .description('Eject atoms from the monorepo workspace into a standalone app')
  .argument('<app-dir>', 'Relative path to the application directory (e.g., apps/talk-with-repo)')
  .action(async (appDir) => {
    const rootDir = process.cwd();
    const targetDir = path.resolve(rootDir, appDir);
    
    if (!fs.existsSync(targetDir)) {
      console.error(`❌ Target directory not found: ${targetDir}`);
      process.exit(1);
    }
    
    console.log(`🦋 Initiating Azathoth Molt sequence for ${appDir}...`);

    const sourceAtomsDir = path.resolve(rootDir, 'atoms/src');
    const targetAtomsDir = path.resolve(targetDir, 'src/vendor/atoms');

    if (!fs.existsSync(sourceAtomsDir)) {
      console.error(`❌ Source atoms directory not found at: ${sourceAtomsDir}`);
      process.exit(1);
    }

    // 1. Create target vendor directory
    if (!fs.existsSync(targetAtomsDir)) {
      fs.mkdirSync(targetAtomsDir, { recursive: true });
    }

    // 2. Physical Code Copier Function
    console.log(`📦 Copying atom source files...`);
    const copyDir = (src: string, dest: string) => {
      if (!fs.existsSync(src)) return;
      if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
      const entries = fs.readdirSync(src, { withFileTypes: true });
      for (let entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        if (entry.isDirectory()) {
          copyDir(srcPath, destPath);
        } else {
          fs.copyFileSync(srcPath, destPath);
        }
      }
    };
    
    // Copy the entire atoms/src directory into the target app's vendor folder
    copyDir(sourceAtomsDir, targetAtomsDir);

    // 3. Import Rewriter Function (AST / RegExp)
    console.log(`🔗 Scanning and rewiring atom imports in ${appDir}/src...`);
    const scanAndRewrite = (dir: string) => {
      const files = fs.readdirSync(dir, { withFileTypes: true });
      for (let file of files) {
        const fullPath = path.join(dir, file.name);
        // Skip the newly created vendor directory itself
        if (file.isDirectory() && fullPath !== targetAtomsDir) {
          scanAndRewrite(fullPath);
        } else if (file.isFile() && /\.(ts|tsx)$/.test(file.name)) {
          let content = fs.readFileSync(fullPath, 'utf8');
          // Replace `@agent-k/atoms` with relative path to vendor/atoms
          if (content.includes('@agent-k/atoms')) {
            const relativePathToVendor = path.relative(path.dirname(fullPath), targetAtomsDir);
            const importPath = relativePathToVendor.startsWith('.') 
                ? relativePathToVendor 
                : `./${relativePathToVendor}`;
            
            content = content.replace(/['"]@agent-k\/atoms['"]/g, `'${importPath}'`);
            fs.writeFileSync(fullPath, content, 'utf8');
            console.log(`  🔄 Rewired: ${path.relative(targetDir, fullPath)}`);
          }
        }
      }
    };

    scanAndRewrite(path.join(targetDir, 'src'));

    // 4. Merge package.json dependencies
    console.log(`📦 Merging external dependencies...`);
    const atomPkgPath = path.resolve(rootDir, 'atoms/package.json');
    const targetPkgPath = path.resolve(targetDir, 'package.json');

    if (fs.existsSync(atomPkgPath) && fs.existsSync(targetPkgPath)) {
      const atomPkg = JSON.parse(fs.readFileSync(atomPkgPath, 'utf8'));
      const targetPkg = JSON.parse(fs.readFileSync(targetPkgPath, 'utf8'));
      
      let modified = false;
      if (atomPkg.dependencies) {
        targetPkg.dependencies = targetPkg.dependencies || {};
        for (const [dep, version] of Object.entries(atomPkg.dependencies)) {
          if (!targetPkg.dependencies[dep]) {
            targetPkg.dependencies[dep] = version;
            modified = true;
          }
        }
      }

      // Remove @agent-k/atoms dependency from target
      if (targetPkg.dependencies && targetPkg.dependencies['@agent-k/atoms']) {
        delete targetPkg.dependencies['@agent-k/atoms'];
        modified = true;
      }

      if (modified) {
        fs.writeFileSync(targetPkgPath, JSON.stringify(targetPkg, null, 2) + '\n', 'utf8');
        console.log('  ✅ Updated package.json');
      }
    }

    console.log(`✨ Molt complete! The app at ${appDir} is now fully decoupled from @agent-k/atoms.`);
    console.log(`⚠️  Remember to run 'npm install' inside the app to fetch the inherited dependencies.`);
  });

program.parse(process.argv);
