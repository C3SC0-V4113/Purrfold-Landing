import { existsSync, rmSync } from 'node:fs';

const staleDevTypesDir = '.next/dev/types';

if (existsSync(staleDevTypesDir)) {
  rmSync(staleDevTypesDir, { recursive: true, force: true });
}
