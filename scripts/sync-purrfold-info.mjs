// Refreshes lib/generated/purrfold-info.json from the published CLI so the
// landing's flag reference, framework list, and tests track the real package.
// Run after each purrfold release: `npm run sync:purrfold`.
import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const target = fileURLToPath(new URL('../lib/generated/purrfold-info.json', import.meta.url));
const npx = process.platform === 'win32' ? 'npx.cmd' : 'npx';
const raw = execFileSync(npx, ['-y', 'purrfold@latest', 'info', '--json'], {
  encoding: 'utf8',
  shell: process.platform === 'win32',
});
const info = JSON.parse(raw);

writeFileSync(target, `${JSON.stringify(info, null, 2)}\n`);
process.stdout.write(`purrfold ${info.version}: ${info.options.length} options -> ${target}\n`);
