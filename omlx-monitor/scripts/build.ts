// Build the source TypeScript to service/main.js for OpenChamber runtime.
import { spawn } from 'node:child_process';
import { copyFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const projectRoot = resolve(import.meta.dir, '..');
const outDir = resolve(projectRoot, 'service');
const outPath = resolve(outDir, 'main.js');

console.log('Building omlx-monitor service...');

const buildProcess = spawn('bun', ['build', '--entrypoints', 'src/service/main.ts', '--outfile', 'service/main.js', '--minify', '--target', 'bun', '--external', 'node:*', '--external', 'http'], {
  cwd: projectRoot,
});

buildProcess.stdout.on('data', (data) => process.stdout.write(data));
buildProcess.stderr.on('data', (data) => process.stderr.write(data));

buildProcess.on('close', (code) => {
  if (code !== 0) {
    console.error('Build failed with code', code);
    process.exit(1);
  }

  console.log('Built service to:', outPath);

  // Also copy panel and status HTML/JS as-is for the extension if they exist.
  const panelDir = resolve(projectRoot, 'panel');
  const statusDir = resolve(projectRoot, 'status');
  const outPanelDir = resolve(outDir, '../panel');
  const outStatusDir = resolve(outDir, '../status');

  if (existsSync(resolve(panelDir, 'index.html'))) {
    copyFileSync(resolve(panelDir, 'index.html'), resolve(outPanelDir, 'index.html'));
  }
  if (existsSync(resolve(panelDir, 'main.ts'))) {
    copyFileSync(resolve(panelDir, 'main.ts'), resolve(outPanelDir, 'main.js'));
  }
  if (existsSync(resolve(statusDir, 'index.html'))) {
    copyFileSync(resolve(statusDir, 'index.html'), resolve(outStatusDir, 'index.html'));
  }
  if (existsSync(resolve(statusDir, 'main.ts'))) {
    copyFileSync(resolve(statusDir, 'main.ts'), resolve(outStatusDir, 'main.js'));
  }

  console.log('Copied panel and status resources if present.');
});
