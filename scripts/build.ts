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

  // Build panel and status directly from root so they use the latest TypeScript source.
  const panelOut = resolve(projectRoot, 'panel/main.js');
  const statusOut = resolve(projectRoot, 'status/main.js');

  // Bundle panel/main.ts -> panel/main.js
  const panelProcess = spawn('bun', ['build', '--entrypoints', 'panel/main.ts', '--outfile', 'panel/main.js', '--minify', '--target', 'bun', '--external', 'http'], {
    cwd: projectRoot,
  });
  panelProcess.stdout.on('data', (data) => process.stdout.write(data));
  panelProcess.stderr.on('data', (data) => process.stderr.write(data));
  panelProcess.on('close', (code) => {
    if (code !== 0) {
      console.error('Panel build failed with code', code);
      process.exit(1);
    }
    console.log('Built panel to:', panelOut);

    // Bundle status/main.ts -> status/main.js
    const statusProcess = spawn('bun', ['build', '--entrypoints', 'status/main.ts', '--outfile', 'status/main.js', '--minify', '--target', 'bun', '--external', 'http'], {
      cwd: projectRoot,
    });
    statusProcess.stdout.on('data', (data) => process.stdout.write(data));
    statusProcess.stderr.on('data', (data) => process.stderr.write(data));
    statusProcess.on('close', (code) => {
      if (code !== 0) {
        console.error('Status build failed with code', code);
        process.exit(1);
      }
      console.log('Built status to:', statusOut);
      console.log('Copied panel and status resources if present.');
    });
  });

  console.log('Copied panel and status resources if present.');
});
