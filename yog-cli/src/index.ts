#!/usr/bin/env node
import { Command } from 'commander';
import { startProxy } from './proxy.js';

const program = new Command();

program
  .name('yog-cli')
  .description('Yog-Sothoth CLI Proxy Injector (Agent K)')
  .requiredOption('-t, --target <url>', 'Target URL to proxy and inject tools into (e.g. http://localhost:3000 or https://example.com)')
  .option('-T, --tools <tools>', 'Comma-separated tools to inject: eyes,gladius,tentacles', 'eyes,gladius,tentacles')
  .option('-p, --port <port>', 'Local proxy port', '8080')
  .parse(process.argv);

const options = program.opts();
const tools = options.tools.split(',');

console.log(`\\n[Yog-Sothoth CLI] 🚀 Starting Reverse Proxy Injector...`);
console.log(`🎯 Target URL: ${options.target}`);
console.log(`🧰 Tools to Inject: ${tools.join(', ')}\\n`);

startProxy(options.target, parseInt(options.port, 10), tools);
