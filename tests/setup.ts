import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// Unmount React trees after every test so component-scheduled work (motion
// animation frames, effects) is cancelled before the jsdom environment is torn
// down. Without this, a pending scheduler task can fire after `window` is gone
// and surface as an unhandled "window is not defined" error on CI.
afterEach(() => {
  cleanup();
});
